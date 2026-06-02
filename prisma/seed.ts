import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding anchorsarmy_db...')

  // Seed a sample registration (for dev/testing only)
  const reg = await prisma.registration.upsert({
    where: { registrationId: 'AAA-0001' },
    update: {},
    create: {
      registrationId: 'AAA-0001',
      fullName: 'Rohit Roy',
      email: 'rohit@bolbbbol.com',
      phone: '+919876543210',
      city: 'Mumbai',
      state: 'Maharashtra',
      age: 28,
      gender: 'male',
      profession: 'Wedding Anchor',
      socialInstagram: '@rohitroy',
      experienceLevel: 'intermediate',
      whyJoin: 'To master the craft of luxury anchoring under BB\'s mentorship.',
      status: 'approved',
    },
  })

  console.log(`Created registration: ${reg.registrationId} — ${reg.fullName}`)

  // Seed a sample contact submission
  await prisma.contactSubmission.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+919000000000',
      subject: 'Enquiry about The 69 Anchors Army',
      message: 'I would like to know more about the program.',
    },
  })

  console.log('Seed complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
