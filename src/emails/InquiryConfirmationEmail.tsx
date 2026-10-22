import * as React from "react";
import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Tailwind, Text} from "react-email";
import {tailwindConfig} from "./theme";

interface InquiryConfirmationEmailProps {
  name: string;
  organization?: string | null;
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

export const InquiryConfirmationEmail = ({
  name,
  organization,
  inquiryType,
  service,
  message,
}: InquiryConfirmationEmailProps) => {
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
      <Preview>Inquiry Received: Isaac Gitonga | Technical Advisory</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-brandBg font-sans py-10">
          <Container className="bg-brandSurface border border-brandBorder rounded-lg mx-auto p-10 max-w-[600px]">
            <Heading className="text-brandPrimary font-mono text-[14px] font-bold tracking-[1.5px] m-0 mb-3">
              [ INTAKE TRANSMITTED ]
            </Heading>
            <Text className="text-brandTextPrimary text-[15px] leading-[1.6] m-0 mb-6">
              Hello {name},<br />
              Thank you for reaching out. I have successfully received your scoping inquiry parameters.
            </Text>
            
            <Section className="bg-brandBg border border-brandBorder rounded-md p-5 mb-5">
              <Text className="text-brandTextMuted text-[11px] font-bold font-mono tracking-[1px] m-0 mb-2">
                TRANSMITTED PARAMETERS
              </Text>
              <Hr className="border-brandBorder m-0 mb-3" />
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Organization:</strong> {organization || "Not provided"}
              </Text>
              <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0 mb-2">
                <strong>Inquiry Area:</strong> {formattedService ? formattedService : formattedInquiry}
              </Text>
              {message && (
                <Text className="text-brandTextSecondary text-[14px] leading-[1.6] m-0">
                  <strong>Core Challenge:</strong> <span className="text-brandTextMuted italic">"{message}"</span>
                </Text>
              )}
            </Section>

            <Section className="bg-brandPrimary/5 border border-brandPrimary/20 rounded-md p-5 mb-5">
              <Text className="text-brandPrimary text-[11px] font-bold font-mono tracking-[1px] m-0 mb-2">
                RESPONSE EXPECTATIONS
              </Text>
              <Hr className="border-brandBorder m-0 mb-3" />
              <Text className="text-brandTextPrimary text-[14px] leading-[1.6] m-0 mb-2.5">
                I review all scoping packages personally. You can expect a response within <strong>12 hours</strong>.
              </Text>
              <Text className="text-brandTextMuted text-[12px] leading-[1.5] m-0">
                If you have supplementary logs, architecture drawings, or database schemas that would help scope your request, please email them directly to <Link href="mailto:advisory@isaacgitonga.com" className="text-brandPrimary no-underline">advisory@isaacgitonga.com</Link> to start the scoping thread.
              </Text>
            </Section>

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

export default InquiryConfirmationEmail;
