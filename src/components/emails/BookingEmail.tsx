import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,} from "@react-email/components";

interface BookingEmailProps {
  name: string;
  organization?: string;
  workEmail: string;
  inquiryType: string;
  message?: string;
  appointmentDate?: string | null;
  appointmentTime?: string | null;
}

export const BookingEmail = ({
  name,
  organization,
  workEmail,
  inquiryType,
  message,
  appointmentDate,
  appointmentTime,
}: BookingEmailProps) => {
  const formattedInquiry = inquiryType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Html>
      <Head />
      <Preview>New Discovery Booking: {name} ({organization || "N/A"})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>[ STATUS: DISCOVERY_INTAKE_RECORDED ]</Heading>
          <Text style={subheading}>
            A new architectural discovery session package has been received.
          </Text>
          
          <Section style={infoSection}>
            <Text style={sectionTitle}>SYSTEM PARAMETERS</Text>
            <Hr style={hr} />
            <Text style={labelValue}>
              <strong>Identifier Name:</strong> {name}
            </Text>
            <Text style={labelValue}>
              <strong>Organization:</strong> {organization || "Not provided"}
            </Text>
            <Text style={labelValue}>
              <strong>Work Email:</strong>{" "}
              <Link href={`mailto:${workEmail}`} style={link}>
                {workEmail}
              </Link>
            </Text>
            <Text style={labelValue}>
              <strong>Inquiry Type:</strong> {formattedInquiry}
            </Text>
          </Section>

          {appointmentDate && appointmentTime && (
            <Section style={slotSection}>
              <Text style={slotTitle}>PROPOSED DISCOVERY SLOT</Text>
              <Hr style={hr} />
              <Text style={slotText}>
                📅 {appointmentDate} @ {appointmentTime}
              </Text>
            </Section>
          )}

          {message && (
            <Section style={messageSection}>
              <Text style={sectionTitle}>CORE CHALLENGE SPECS</Text>
              <Hr style={hr} />
              <Text style={messageText}>"{message}"</Text>
            </Section>
          )}

          <Hr style={footerHr} />
          <Text style={footer}>
            isaacgitonga.com &bull; Confidential Scoping Intake
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingEmail;

// Styles
const main = {
  backgroundColor: "#0b0f17",
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "8px",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "600px",
};

const heading = {
  color: "#34d399", // Emerald accent for integrity status
  fontFamily: 'monospace',
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  margin: "0 0 10px 0",
};

const subheading = {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 30px 0",
};

const infoSection = {
  backgroundColor: "#0b0f17",
  border: "1px solid #1f2937",
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "20px",
};

const slotSection = {
  backgroundColor: "rgba(56, 189, 248, 0.05)",
  border: "1px solid rgba(56, 189, 248, 0.2)",
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "20px",
};

const messageSection = {
  backgroundColor: "#0b0f17",
  border: "1px solid #1f2937",
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "20px",
};

const sectionTitle = {
  color: "#94a3b8",
  fontSize: "11px",
  fontWeight: "bold",
  fontFamily: "monospace",
  letterSpacing: "1px",
  margin: "0 0 8px 0",
};

const slotTitle = {
  color: "#38bdf8", // Electric cyan accent
  fontSize: "11px",
  fontWeight: "bold",
  fontFamily: "monospace",
  letterSpacing: "1px",
  margin: "0 0 8px 0",
};

const slotText = {
  color: "#f8fafc",
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "monospace",
  margin: "8px 0 0 0",
};

const hr = {
  borderColor: "#1f2937",
  margin: "0 0 12px 0",
};

const labelValue = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
};

const link = {
  color: "#38bdf8",
  textDecoration: "none",
};

const messageText = {
  color: "#cbd5e1",
  fontSize: "14px",
  lineHeight: "1.6",
  fontStyle: "italic",
  margin: "0",
};

const footerHr = {
  borderColor: "#1f2937",
  margin: "30px 0 20px 0",
};

const footer = {
  color: "#4b5563",
  fontSize: "11px",
  textAlign: "center" as const,
  fontFamily: "monospace",
};
