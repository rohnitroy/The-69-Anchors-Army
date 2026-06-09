import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Loader from '@/components/ui/Loader'
import { ModalProvider } from '@/context/ModalContext'
import RegistrationModal from '@/components/ui/RegistrationModal'
import { ToastProvider } from '@/components/ui/Toast'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '69 Anchors Army — Powered by Anchor Bol BB Bol',
  description:
    'A premium community of 69 professional anchors. Where anchors command the mic.',
  openGraph: {
    title: '69 Anchors Army',
    description: 'Where anchors command the mic.',
    images: ['/logos/anchors-army-logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-text-primary">
        <ToastProvider>
          <ModalProvider>
            <Loader />
            {children}
            <RegistrationModal />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
