import { PrismaClient, Gender, PaymentMode } from '@prisma/client'

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

  // Seed demo slot registrations for admin dashboard testing
  const demoSlots = [
    { fullName: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+919876543211', slot: 'squadA' as const, gender: 'female' as const, paymentMode: 'upi' as const, comments: 'Looking forward to Squad A dates' },
    { fullName: 'Amit Patel', email: 'amit.patel@email.com', phone: '+919876543212', slot: 'squadA' as const, gender: 'male' as const, paymentMode: 'cash' as const, comments: 'First-time participant' },
    { fullName: 'Neha Gupta', email: 'neha.gupta@email.com', phone: '+919876543213', slot: 'squadB' as const, gender: 'female' as const, paymentMode: 'neft' as const, comments: 'Can\'t wait!' },
    { fullName: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+919876543214', slot: 'squadB' as const, gender: 'male' as const, paymentMode: 'upi' as const, comments: '' },
    { fullName: 'Anushka Singh', email: 'anushka.singh@email.com', phone: '+919876543215', slot: 'squadC' as const, gender: 'female' as const, paymentMode: 'cash' as const, comments: 'Excited about this opportunity' },
    { fullName: 'Vikram Desai', email: 'vikram.desai@email.com', phone: '+919876543216', slot: 'squadC' as const, gender: 'male' as const, paymentMode: 'neft' as const, comments: 'Professional anchor' },
    { fullName: 'Deepika Nair', email: 'deepika.nair@email.com', phone: '+919876543217', slot: 'squadD' as const, gender: 'female' as const, paymentMode: 'upi' as const, comments: 'Ready to transform' },
    { fullName: 'Sanjay Verma', email: 'sanjay.verma@email.com', phone: '+919876543218', slot: 'squadD' as const, gender: 'male' as const, paymentMode: 'cash' as const, comments: 'Been anchoring for 5 years' },
    { fullName: 'Kavya Reddy', email: 'kavya.reddy@email.com', phone: '+919876543219', slot: 'squadE' as const, gender: 'female' as const, paymentMode: 'upi' as const, comments: 'Flexible with dates' },
    { fullName: 'Arjun Bhat', email: 'arjun.bhat@email.com', phone: '+919876543220', slot: 'squadE' as const, gender: 'male' as const, paymentMode: 'neft' as const, comments: 'Any of the above is fine' },
    { fullName: 'Meera Das', email: 'meera.das@email.com', phone: '+919876543221', slot: 'squadA' as const, gender: 'female' as const, paymentMode: 'cash' as const, comments: 'Demo entry 11' },
    { fullName: 'Nikhil Pandey', email: 'nikhil.pandey@email.com', phone: '+919876543222', slot: 'squadB' as const, gender: 'male' as const, paymentMode: 'upi' as const, comments: 'Demo entry 12' },
  ]

  for (const slot of demoSlots) {
    await prisma.slotRegistration.upsert({
      where: { email: slot.email },
      update: {},
      create: {
        fullName: slot.fullName,
        email: slot.email,
        phone: slot.phone,
        slot: slot.slot,
        gender: slot.gender,
        paymentMode: slot.paymentMode,
        comments: slot.comments || null,
        status: 'pending',
      },
    })
  }

  console.log(`Created ${demoSlots.length} demo slot registrations`)

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
