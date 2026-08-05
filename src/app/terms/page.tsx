import Link from 'next/link'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-[#333] bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80">
            <AnchorsArmyLogo className="w-12" />
            <span className="text-white font-semibold">69 Anchors Army</span>
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="/pdf/The 69 Anchors Army_Terms & Conditions.pdf"
              download="The 69 Anchors Army - Terms & Conditions.pdf"
              className="text-[#C8960C] hover:text-[#B08608] font-semibold text-sm flex items-center gap-1.5 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            <Link href="/" className="text-white/60 hover:text-white font-semibold text-sm transition-colors duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-white mb-2">Terms & Conditions</h1>
        <p className="text-gray-400 mb-12">Last updated: June 9, 2026</p>

        <div className="space-y-8 text-text-secondary">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the 69 Anchors Army website and registering for our events, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Registration and Eligibility</h2>
            <p className="leading-relaxed mb-4">
              By registering for 69 Anchors Army events, you confirm that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are at least 18 years of age</li>
              <li>All information provided is accurate and truthful</li>
              <li>You have the authority to register yourself</li>
              <li>You will use the same email and mobile number for all interactions</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
            <p className="leading-relaxed mb-4">
              Payment for event registration:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Accepted payment methods: UPI and NEFT (Bank Transfer)</li>
              <li>Payments are non-refundable once confirmed, except in cases of event cancellation</li>
              <li>We do not store payment details on our servers - all payments are processed securely through authorized providers</li>
              <li>Payment confirmation will be sent to your registered email address</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Event Registration and Cancellation</h2>
            <p className="leading-relaxed mb-4">
              <strong>Cancellation by Registrant:</strong> If you wish to cancel your registration, please contact us at least 7 days before the event. Cancellations made within 7 days of the event are non-refundable.
            </p>
            <p className="leading-relaxed">
              <strong>Cancellation by Company:</strong> We reserve the right to cancel or postpone events due to unforeseen circumstances. In such cases, we will provide a full refund or offer registration transfer to a future event.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Code of Conduct</h2>
            <p className="leading-relaxed mb-4">
              As a participant, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Treat all staff, organizers, and participants with respect</li>
              <li>Not engage in disruptive, offensive, or discriminatory behavior</li>
              <li>Follow all instructions from event organizers</li>
              <li>Not record or broadcast the event without explicit permission</li>
              <li>Comply with all venue rules and local regulations</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on the 69 Anchors Army website, including text, images, logos, and videos, is the property of Bol BB Bol (Dynamic Entertainment) and protected by copyright laws. You may not reproduce, distribute, or transmit any content without prior written consent.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Liability Limitation</h2>
            <p className="leading-relaxed">
              69 Anchors Army and its organizers are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or participation in our events. Participants assume all risks associated with attendance.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Usage and Photography</h2>
            <p className="leading-relaxed">
              By registering, you consent to being photographed or filmed during the event. These materials may be used for promotional purposes on our website and social media. If you do not wish to be photographed, please notify us in advance.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external sites. Use of third-party services is at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact and Support</h2>
            <p className="leading-relaxed">
              For any questions or concerns regarding these terms, please contact:
              <br />
              <a href="mailto:vinodsharma@dynamicentertainment.co" className="text-[#C8960C] hover:text-[#B08608] font-semibold">
                vinodsharma@dynamicentertainment.co
              </a>
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective upon posting. Your continued use of our services constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
