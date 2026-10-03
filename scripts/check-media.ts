import sharp from 'sharp'
import manifest from '../src/data/media.json'

const root = new URL('../public/', import.meta.url)
let bytes = 0
for (const [src, asset] of Object.entries(manifest)) {
  const file = Bun.file(new URL(src.slice(1), root))
  const data = Buffer.from(await file.arrayBuffer())
  if (data.length !== asset.bytes) throw new Error(`${src}: stale byte count`)
  bytes += data.length
  if (asset.type === 'image') {
    const image = asset as typeof manifest['/shots/miao.webp']
    const metadata = await sharp(data).metadata()
    if (metadata.width !== image.width || metadata.height !== image.height) throw new Error(`${src}: incorrect dimensions`)
    if (data.length > 300_000 || image.width > 1600) throw new Error(`${src}: still-image budget exceeded`)
    const small = Bun.file(new URL(image.small.slice(1), root))
    const smallData = Buffer.from(await small.arrayBuffer())
    const smallMetadata = await sharp(smallData).metadata()
    if (smallMetadata.width !== 640 || smallData.length > 100_000) throw new Error(`${image.small}: mobile budget exceeded`)
    bytes += smallData.length
    continue
  }
  const video = asset as typeof manifest['/shots/mtty-states.mp4']
  // One silent H.264 track, with moov before mdat for progressive playback.
  if (data.toString('ascii', 4, 8) !== 'ftyp' || data.indexOf('moov') > data.indexOf('mdat')) throw new Error(`${src}: invalid or non-streamable MP4`)
  const track = data.indexOf('tkhd')
  const end = track - 4 + data.readUInt32BE(track - 4)
  const width = data.readUInt32BE(end - 8) >>> 16
  const height = data.readUInt32BE(end - 4) >>> 16
  const header = data.indexOf('mvhd') + 4
  if (data[header] !== 0) throw new Error(`${src}: unsupported MP4 time-header version`)
  const seconds = data.readUInt32BE(header + 16) / data.readUInt32BE(header + 12)
  if (width !== video.width || height !== video.height || Math.abs(seconds - video.seconds) > .15) throw new Error(`${src}: incorrect video metadata`)
  if (data.length > 250_000 || width > 1280 || seconds > 20) throw new Error(`${src}: demo budget exceeded`)
  if (!(video.poster in manifest)) throw new Error(`${src}: missing poster`)
}
if (bytes > 3_000_000) throw new Error(`Product media exceed the 3 MB total budget: ${bytes}`)
console.log(`Verified ${Object.keys(manifest).length} assets + responsive stills: ${(bytes / 1_000_000).toFixed(2)} MB`)
