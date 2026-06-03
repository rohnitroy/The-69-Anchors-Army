import {
  Html, Head, Preview, Body, Container,
  Section, Row, Column, Img, Text, Hr, Button,
} from '@react-email/components'

interface Props {
  fullName: string
  slot:     string
  dates:    string
  checkout: string
  appUrl:   string
}

export default function ConfirmationEmail({ fullName, slot, dates, checkout, appUrl }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your {slot} slot is confirmed — {dates}. Welcome to the 69 Anchors Army.</Preview>
      <Body style={body}>

        {/* Gold top bar */}
        <div style={topBar} />

        <Container style={container}>

          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${appUrl}/logos/anchors-army-logo.png`}
              alt="69 Anchors Army"
              width="160"
              height="auto"
              style={{ margin: '0 auto', display: 'block' }}
            />
          </Section>

          {/* Gold divider */}
          <Section style={{ padding: '0 40px' }}>
            <div style={goldDivider} />
          </Section>

          {/* Status badge */}
          <Section style={{ textAlign: 'center', padding: '24px 40px 0' }}>
            <div style={badge}>✦ REGISTRATION CONFIRMED ✦</div>
          </Section>

          {/* Headline */}
          <Section style={{ padding: '16px 40px 0', textAlign: 'center' }}>
            <Text style={headline}>Your Slot is Locked In</Text>
            <Text style={subtext}>
              Welcome, {fullName}. You&apos;ve secured your place in the 69 Anchors Army.
            </Text>
          </Section>

          {/* Squad card */}
          <Section style={{ padding: '24px 40px' }}>
            <div style={squadCard}>
              <Text style={squadLabel}>{slot}</Text>
              <Text style={squadDates}>{dates}</Text>
              <div style={checkoutRow}>
                <Text style={checkoutText}>Checkout &nbsp;·&nbsp; {checkout}</Text>
              </div>
            </div>
          </Section>

          {/* Divider */}
          <Section style={{ padding: '0 40px' }}>
            <Hr style={hr} />
          </Section>

          {/* What happens next */}
          <Section style={{ padding: '8px 40px 24px' }}>
            <Text style={sectionTitle}>What happens next</Text>
            <Row style={{ marginBottom: 10 }}>
              <Column style={{ width: 24 }}>
                <Text style={bullet}>→</Text>
              </Column>
              <Column>
                <Text style={listItem}>
                  Our team will reach out on your registered mobile number with venue details and logistics.
                </Text>
              </Column>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Column style={{ width: 24 }}>
                <Text style={bullet}>→</Text>
              </Column>
              <Column>
                <Text style={listItem}>
                  You&apos;ll be added to the exclusive 69 Anchors Army WhatsApp community.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ width: 24 }}>
                <Text style={bullet}>→</Text>
              </Column>
              <Column>
                <Text style={listItem}>
                  Keep this email. It is your confirmation record.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* CTA */}
          <Section style={{ textAlign: 'center', padding: '8px 40px 32px' }}>
            <Button href={appUrl} style={ctaButton}>
              Visit bolbbbol.com
            </Button>
          </Section>

          {/* Divider */}
          <Section style={{ padding: '0 40px' }}>
            <Hr style={hr} />
          </Section>

          {/* Quote */}
          <Section style={{ padding: '28px 40px', textAlign: 'center' }}>
            <Text style={quote}>&ldquo;baat karne se baat banti hai&rdquo;</Text>
            <Text style={quoteAttrib}>— Anchor BB</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated confirmation from the 69 Anchors Army registration system.
              <br />
              Powered by{' '}
              <a href={appUrl} style={{ color: '#C8960C', textDecoration: 'none' }}>
                Anchor Bol BB Bol
              </a>
            </Text>
            <Text style={footerMuted}>
              © 2025 Anchor Bol BB Bol · {appUrl}
            </Text>
          </Section>

        </Container>

        {/* Bottom gold bar */}
        <div style={topBar} />

      </Body>
    </Html>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#050505',
  fontFamily: 'Georgia, "Times New Roman", serif',
  margin: 0,
  padding: '40px 0',
}

const topBar: React.CSSProperties = {
  height: 3,
  background: 'linear-gradient(to right, transparent, #C8960C 20%, #E8B84B 50%, #C8960C 80%, transparent)',
}

const container: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  maxWidth: 600,
  margin: '0 auto',
  border: '1px solid rgba(200,150,12,0.2)',
}

const logoSection: React.CSSProperties = {
  padding: '44px 40px 28px',
  textAlign: 'center',
}

const goldDivider: React.CSSProperties = {
  height: 1,
  background: 'linear-gradient(to right, transparent, rgba(200,150,12,0.6) 30%, rgba(200,150,12,0.6) 70%, transparent)',
}

const badge: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'Arial, sans-serif',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: '#C8960C',
  border: '1px solid rgba(200,150,12,0.4)',
  padding: '6px 16px',
  background: 'rgba(200,150,12,0.06)',
}

const headline: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: 32,
  fontWeight: 600,
  color: '#F0E8D8',
  margin: '0 0 10px',
  lineHeight: 1.2,
}

const subtext: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 15,
  color: '#888',
  margin: '0 0 4px',
  lineHeight: 1.6,
}

const squadCard: React.CSSProperties = {
  border: '1px solid rgba(200,150,12,0.35)',
  background: 'rgba(200,150,12,0.04)',
  padding: '24px 28px',
  textAlign: 'center',
}

const squadLabel: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.2em',
  color: '#C8960C',
  margin: '0 0 8px',
  textTransform: 'uppercase',
}

const squadDates: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: 26,
  fontWeight: 600,
  color: '#F0E8D8',
  margin: '0 0 10px',
  lineHeight: 1.2,
}

const checkoutRow: React.CSSProperties = {
  display: 'inline-block',
  borderTop: '1px solid rgba(200,150,12,0.2)',
  paddingTop: 10,
  marginTop: 4,
}

const checkoutText: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  color: '#888',
  margin: 0,
  letterSpacing: '0.08em',
}

const hr: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.06)',
  margin: '4px 0',
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.18em',
  color: '#C8960C',
  textTransform: 'uppercase',
  margin: '20px 0 14px',
}

const bullet: React.CSSProperties = {
  color: '#C8960C',
  fontSize: 14,
  margin: '0 8px 0 0',
  lineHeight: 1.7,
}

const listItem: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  color: '#AAA',
  lineHeight: 1.7,
  margin: 0,
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  background: '#C8960C',
  color: '#000',
  fontFamily: 'Arial, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '14px 36px',
}

const quote: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: 20,
  fontStyle: 'italic',
  color: '#888',
  margin: '0 0 8px',
  lineHeight: 1.5,
}

const quoteAttrib: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  color: '#555',
  margin: 0,
  letterSpacing: '0.1em',
}

const footer: React.CSSProperties = {
  padding: '16px 40px 36px',
  textAlign: 'center',
  background: 'rgba(200,150,12,0.03)',
  borderTop: '1px solid rgba(200,150,12,0.1)',
}

const footerText: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  color: '#555',
  margin: '0 0 6px',
  lineHeight: 1.6,
}

const footerMuted: React.CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 11,
  color: '#333',
  margin: 0,
}
