const crypto = require('crypto')

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/setup-admin.js <password>')
  console.error('Example: node scripts/setup-admin.js "SecurePassword123"')
  process.exit(1)
}

const salt = crypto.randomBytes(16).toString('hex')
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
const passwordHash = `${salt}:${hash}`

console.log('\n✓ Admin password hash generated successfully!\n')
console.log('Add these to your .env file:\n')
console.log(`ADMIN_USERNAME=admin`)
console.log(`ADMIN_PASSWORD_HASH=${passwordHash}\n`)
console.log('Then restart your development server.\n')
