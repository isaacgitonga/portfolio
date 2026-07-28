import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Contact, ContactSchema } from "@/schema/contact.schema.ts";
import CustomSelect from "@/components/react/CustomSelect.tsx";

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formSectionRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Contact>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      message: "",
    },
  });

  const inquiryTypeValue = watch("inquiryType");

  useEffect(() => {
    register("inquiryType");
  }, [register]);

  useEffect(() => {
    const handleSelectTier = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { inquiry } = customEvent.detail;
        if (inquiry) {
          setValue("inquiryType", inquiry, { shouldValidate: true });
        }
        formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("select-tier", handleSelectTier);
    return () => window.removeEventListener("select-tier", handleSelectTier);
  }, [setValue]);

  const onSubmitForm = async (data: Contact) => {
    if (data.botCheck) {
      setSubmissionStatus("success");
      return;
    }

    setSubmissionStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok && response.status !== 404) {
        throw new Error(`TRANSMIT_FAILURE: Status code ${response.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmissionStatus("success");
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err: unknown) {
      console.error(err);
      setSubmissionStatus("error");
      const msg = err instanceof Error ? err.message : "TRANSMISSION_ERROR: Connection timed out.";
      setErrorMessage(msg);
    }
  };

  const handleResetForm = () => {
    setSubmissionStatus("idle");
    reset();
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inquiryOptions = [
    { value: "architecture_consulting", label: "Systems Architecture Consulting" },
    { value: "fractional_cto", label: "Fractional CTO / Lead Architect" },
    { value: "legacy_modernization", label: "Legacy Platform Modernization" },
    { value: "greenfield_platform", label: "Greenfield Platform / MVP Build" },
    { value: "checkout_payments", label: "Checkout & Payments Integration" },
    { value: "database_design", label: "Database Schema & Query Tuning" },
    { value: "dedicated_backend", label: "Dedicated Backend API Build" },
    { value: "other", label: "Other Technical Challenge" },
  ];

  return (
    <div ref={formSectionRef} className="space-y-6 scroll-mt-24 w-full">
      <div className="space-y-2 pb-2 border-b border-surface-border/50">
        <h2 className="text-2xl font-iceberg font-bold text-foreground">
          {submissionStatus === "success" ? "Message Transmitted" : "Scoping Intake Form"}
        </h2>
        <p className="text-sm text-muted font-montserrat">
          {submissionStatus === "success" 
            ? "[ STATUS: MESSAGE_TRANSMITTED ]" 
            : "Provide parameters below to register your queue payload."}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {submissionStatus === "success" ? (
          <div className="text-center py-10 space-y-6 animate-fadeIn">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <svg className="size-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-iceberg font-bold text-foreground">
                Message transmitted.
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto font-montserrat leading-relaxed font-medium">
                Your payload has been successfully dispatched to the serverless queue. I will review the logs and reply shortly.
              </p>
            </div>
            <button
              onClick={handleResetForm}
              className="px-6 py-2 bg-surface border border-surface-border hover:bg-surface-hover text-foreground font-bold font-iceberg text-sm rounded-lg transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8 animate-fadeIn">
            <input
              type="text"
              {...register("botCheck")}
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {submissionStatus === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg font-mono text-xs flex gap-2 items-center">
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className={`w-full bg-background border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
                    errors.name ? "focus:ring-red-500/20 focus:border-red-500" : "border-surface-border"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs font-mono mt-1 flex gap-1 items-center">
                    <span className="inline-block size-1 bg-red-400 rounded-full" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  placeholder="e.g. Acme Corp"
                  {...register("organization")}
                  className="w-full bg-background border border-surface-border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-all font-nunito"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="workEmail" className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                  Work Email
                </label>
                <input
                  type="text"
                  id="workEmail"
                  placeholder="john@company.com"
                  {...register("workEmail")}
                  className={`w-full bg-background border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
                    errors.workEmail ? "focus:ring-red-500/20 focus:border-red-500" : "border-surface-border"
                  }`}
                />
                {errors.workEmail && (
                  <p className="text-red-400 text-xs font-mono mt-1 flex gap-1 items-center">
                    <span className="inline-block size-1 bg-red-400 rounded-full" />
                    {errors.workEmail.message}
                  </p>
                )}
              </div>

              <CustomSelect
                label="Inquiry Type"
                placeholder="-- Select inquiry type --"
                options={inquiryOptions}
                value={inquiryTypeValue || ""}
                onChange={(val) => setValue("inquiryType", val as Contact["inquiryType"], { shouldValidate: true })}
                error={errors.inquiryType?.message}
              />
            </div>

            <div className="space-y-2 pt-3">
              <label htmlFor="message" className="block text-sm font-semibold text-foreground tracking-wide">
                What is the primary technical or business challenge you are trying to solve? (Optional)
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="e.g. Scaling checkout transaction safety, migrating backend architecture..."
                {...register("message")}
                className={`w-full bg-background border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
                  errors.message ? "focus:ring-red-500/20 focus:border-red-500" : "border-surface-border"
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs font-mono mt-1 flex gap-1 items-center">
                  <span className="inline-block size-1 bg-red-400 rounded-full" />
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submissionStatus === "submitting"}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/45 disabled:cursor-not-allowed text-background font-bold font-iceberg text-xl rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {submissionStatus === "submitting" ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-background" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>SENDING...</span>
                </>
              ) : (
                <span>SEND MESSAGE</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
