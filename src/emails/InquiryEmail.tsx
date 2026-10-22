import * as React from "react";
import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Tailwind, Text} from "react-email";
import {tailwindConfig} from "./theme";

interface InquiryEmailProps {
  name: string;
  organization?: string | null;
  workEmail: string;
  inquiryType?: string | null;
  service?: string | null;
  message?: string | null;
}

const serviceNames: Record<string, string> = {
  'backend-infra': 'Resilient Backend & API Infrastructure',
  'identity-access': 'Enterprise Identity & Access Control (RBAC/ABAC)',
  'payment-billing': 'Idempotent Payment & Billing Architectures',
  'admin-consoles': 'Data-Dense Admin Consoles & Real-Time Sync',
  'risk-auditing': 'Architectural Risk Auditing & Consultation',
  'deterministic-rag': 'Deterministic RAG & Secure Agent Integration',
};

export const InquiryEmail = ({
  name,
  organization,
  workEmail,
  inquiryType,
  service,
  message,
}: InquiryEmailProps): React.JSX.Element => {
  const formattedInquiry = inquiryType
    ? inquiryType
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  const formattedService = service ? (serviceNames[service] || service) : null;

  return (
    <Html>
      <Head />
      <Preview>New Scoping Inquiry: {name} ({organization || "N/A"})</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-brandBg font-sans py-10">
          <Container className="bg-brandSurface border border-brandBorder rounded-lg mx-auto p-10 max-w-[600px]">
            <Heading className="text-brandPrimary font-mono text-[14px] font-bold tracking-[1.5px] m-0 mb-3">
              [ STATUS: MESSAGE_TRANSMITTED ]
            </Heading>
            <Text className="text-brandTextMuted text-[14px] leading-[1.5] m-0 mb-8">
              A new general scoping inquiry has been received.
            </Text>
            
            <Section className="bg-brandBg border border-brandBorder rounded-md p-5 mb-5">
              <Text className="text-brandTextMuted text-[11px] font-bold font-mono tracking-[1px] m-0 mb-2">
                SYSTEM PARAMETERS
              </Text>
              <Hr className="border-brandBorder m-0 mb-3" />
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Name:</strong> {name}
              </Text>
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Organization:</strong> {organization || "Not provided"}
              </Text>
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Work Email:</strong>{" "}
                <Link href={`mailto:${workEmail}`} className="text-brandPrimary no-underline">
                  {workEmail}
                </Link>
              </Text>
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Inquiry Area:</strong> {formattedService ? formattedService : formattedInquiry}
              </Text>
            </Section>

            {message && (
              <Section className="bg-brandBg border border-brandBorder rounded-md p-5 mb-5">
                <Text className="text-brandTextMuted text-[11px] font-bold font-mono tracking-[1px] m-0 mb-2">
                  CORE CHALLENGE SPECS
                </Text>
                <Hr className="border-brandBorder m-0 mb-3" />
                <Text className="text-brandTextSecondary text-[14px] leading-[1.6] italic m-0">
                  "{message}"
                </Text>
              </Section>
            )}

            <Hr className="border-brandBorder m-0 mt-8 mb-5" />
            <Section className="text-center text-[10px]">
              <Text className="text-brandTextMutedDark m-0 mb-1">
                <strong>Isaac Gitonga</strong> {" \u2022 "} Principal Architect & Technical Consultant
              </Text>
              <Text className="text-brandTextMutedDark m-0 mb-3">
                Nairobi, Kenya / Remote {" \u2022 "} <Link href="mailto:advisory@isaacgitonga.com" className="text-brandPrimary no-underline">advisory@isaacgitonga.com</Link>
              </Text>
              <Text className="text-brandTextMutedDark m-0">
                <Link href="https://twitter.com/_isaacgitonga" className="text-brandPrimary no-underline">Twitter</Link>
                {" \u2022 "}
                <Link href="https://www.linkedin.com/in/isaacgitonga" className="text-brandPrimary no-underline">LinkedIn</Link>
                {" \u2022 "}
                <Link href="https://www.instagram.com/_isaacgitonga" className="text-brandPrimary no-underline">Instagram</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InquiryEmail;
