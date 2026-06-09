import Link from 'next/link'
import AnchorsArmyLogo from '@/components/logos/AnchorsArmyLogo'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-[#333] bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80">
            <AnchorsArmyLogo className="w-12" />
            <span className="text-white font-semibold">69 Anchors Army</span>
          </Link>
          <Link href="/" className="text-[#C8960C] hover:text-[#B08608] font-semibold text-sm">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: June 9, 2026</p>

        <div className="space-y-8 text-text-secondary">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to 69 Anchors Army ("we," "us," "our," or "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">We collect information in the following ways:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Registration Information:</strong> Name, email address, mobile number, gender, and payment preferences when you register for our events</li>
              <li><strong>Payment Information:</strong> Payment mode selection (UPI/NEFT) - actual payment details are processed securely by third-party providers</li>
              <li><strong>Communication Data:</strong> Any messages you send us via contact forms</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information for security and analytics purposes</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">We use the collected information for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Event Management:</strong> Processing your registration and managing event logistics</li>
              <li><strong>Communication:</strong> Sending you event updates, confirmations, and important notices</li>
              <li><strong>Legal Compliance:</strong> Fulfilling legal obligations and preventing fraudulent activities</li>
              <li><strong>Service Improvement:</strong> Analyzing usage patterns to enhance our platform</li>
              <li><strong>Networking:</strong> Facilitating connections with other event participants (only with your consent)</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All data is encrypted during transmission and stored securely on protected servers.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            <p className="leading-relaxed">
              Your personal information will be retained for as long as necessary to provide our services and fulfill the purposes outlined in this policy. For registered users, we retain your data for at least 2 years for legal and accounting purposes, unless you request deletion.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Opt-out of data processing for non-essential purposes</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p className="leading-relaxed">
              For any privacy concerns or to exercise your rights, please contact us at:
              <br />
              <a href="mailto:vinodsharma@dynamicentertainment.co" className="text-[#C8960C] hover:text-[#B08608] font-semibold">
                vinodsharma@dynamicentertainment.co
              </a>
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
