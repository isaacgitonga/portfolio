import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  organization?: string;
  workEmail: string;
  inquiryType: string;
  message?: string;
}

export const ContactEmail = ({
  name,
  organization,
  workEmail,
  inquiryType,
  message,
}: ContactEmailProps) => {
  const formattedInquiry = inquiryType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Html>
      <Head />
      <Preview>New Scoping Inquiry: {name} ({organization || "N/A"})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>[ STATUS: MESSAGE_TRANSMITTED ]</Heading>
          <Text style={subheading}>
            A new general scoping inquiry has been received.
          </Text>
          
          <Section style={infoSection}>
            <Text style={sectionTitle}>SYSTEM PARAMETERS</Text>
            <Hr style={hr} />
            <Text style={labelValue}>
              <strong>Name:</strong> {name}
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

export default ContactEmail;

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
  color: "#38bdf8", // Cyan accent for general messages
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
