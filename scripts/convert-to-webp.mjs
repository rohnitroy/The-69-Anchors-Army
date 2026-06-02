import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const IMAGES_DIR = './public/images'
const QUALITY = 92

const files = (await readdir(IMAGES_DIR))
  .filter(f => /\.(jpg|jpeg)$/i.test(f))
  // Only convert the images actually used on the site (skip brochure originals)
  .filter(f => !f.startsWith('The 69') && !f.startsWith('Event '))

console.log(`Converting ${files.length} images → WebP @ quality ${QUALITY}\n`)

for (const file of files) {
  const src  = join(IMAGES_DIR, file)
  const dest = join(IMAGES_DIR, basename(file, extname(file)) + '.webp')

  const srcMeta = await sharp(src).metadata()
  const { data, info } = await sharp(src)
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer({ resolveWithObject: true })

  const origKB = (await import('fs')).default.statSync(src).size / 1024
  const newKB  = info.size / 1024
  const saving = Math.round((1 - newKB / origKB) * 100)

  await import('fs').then(m => m.default.writeFileSync(dest, data))

  console.log(
    `✓ ${file.padEnd(28)}`,
    `${srcMeta.width}×${srcMeta.height}`,
    `  ${Math.round(origKB)}KB → ${Math.round(newKB)}KB`,
    `(${saving > 0 ? '-' : '+'}${Math.abs(saving)}%)`
  )
}

console.log('\nAll images converted to WebP.')
