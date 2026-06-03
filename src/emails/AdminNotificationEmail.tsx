import {
  Html, Head, Preview, Body, Container,
  Section, Row, Column, Img, Text, Hr,
} from '@react-email/components'

interface Props {
  fullName:  string
  email:     string
  phone:     string
  slot:      string
  dates:     string
  checkout:  string
  comments?: string | null
  appUrl:    string
  timestamp: string
}

export default function AdminNotificationEmail({
  fullName, email, phone, slot, dates, checkout, comments, appUrl, timestamp,
}: Props) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New registration: {fullName} → {slot} ({dates})</Preview>
      <Body style={body}>

        <div style={topBar} />

        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Img
              src={`${appUrl}/logos/anchors-army-logo.png`}
              alt="69 Anchors Army"
              width="120"
              height="auto"
              style={{ margin: '0 auto', display: 'block', marginBottom: 16 }}
            />
            <div style={alertBadge}>NEW REGISTRATION</div>
          </Section>

          {/* Divider */}
          <div style={goldDivider} />

          {/* Details */}
          <Section style={{ padding: '28px 36px' }}>
            <Text style={sectionTitle}>Registration Details</Text>

            <DetailRow label="Full Name"    value={fullName} />
            <Hr style={rowDivider} />
            <DetailRow label="Email"        value={email} />
            <Hr style={rowDivider} />
            <DetailRow label="Mobile"       value={phone} />
            <Hr style={rowDivider} />
            <DetailRow label="Squad"        value={slot} />
            <Hr style={rowDivider} />
            <DetailRow label="Dates"        value={dates} />
            <Hr style={rowDivider} />
            <DetailRow label="Checkout"     value={checkout} />
            {comments && (
              <>
                <Hr style={rowDivider} />
                <DetailRow label="Notes" value={comments} />
              </>
            )}
          </Section>

          <div style={goldDivider} />

          {/* Timestamp */}
          <Section style={{ padding: '16px 36px 28px', textAlign: 'center' }}>
            <Text style={timestampText}>Registered at {timestamp}</Text>
          </Section>

        </Container>

        <div style={topBar} />

      </Body>
    </Html>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: 2, marginTop: 2 }}>
      <Column style={{ width: 100 }}>
        <Text style={labelStyle}>{label}</Text>
      </Column>
      <Column>
        <Text style={valueStyle}>{value}</Text>
      </Column>
    </Row>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#050505',
  fontFamily: 'Arial, sans-serif',
  margin: 0,
  padding: '40px 0',
}

const topBar: React.CSSProperties = {
  height: 3,
  background: 'linear-gradient(to right, transparent, #C8960C 20%, #E8B84B 50%, #C8960C 80%, transparent)',
}

const container: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  maxWidth: 520,
  margin: '0 auto',
  border: '1px solid rgba(200,150,12,0.2)',
}

const header: React.CSSProperties = {
  padding: '36px 36px 24px',
  textAlign: 'center',
}

const alertBadge: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'Arial, sans-serif',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.22em',
  color: '#000',
  background: '#C8960C',
  padding: '6px 18px',
  marginTop: 4,
}

const goldDivider: React.CSSProperties = {
  height: 1,
  background: 'linear-gradient(to right, transparent, rgba(200,150,12,0.5) 30%, rgba(200,150,12,0.5) 70%, transparent)',
  margin: '0 36px',
}

const sectionTitle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.2em',
  color: '#C8960C',
  textTransform: 'uppercase',
  margin: '0 0 16px',
}

const rowDivider: React.CSSProperties = {
  borderTop: '1px solid rgba(255,255,255,0.05)',
  margin: '6px 0',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#555',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  margin: '6px 0',
}

const valueStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#D0C8B8',
  margin: '6px 0',
  lineHeight: 1.4,
}

const timestampText: React.CSSProperties = {
  fontSize: 11,
  color: '#444',
  margin: 0,
  letterSpacing: '0.06em',
}
