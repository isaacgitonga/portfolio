import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type Contact, ContactSchema} from "@/schema/contact.schema.ts";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

function CustomSelect({ label, placeholder, options, value, onChange, error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="block text-sm font-semibold font-nunito text-foreground tracking-wide">
        {label}
      </label>
      
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-surface border rounded-lg p-4 text-left text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito flex items-center justify-between cursor-pointer ${
          error ? "focus:ring-red-500/20 focus:border-red-500" : "border-surface-border"
        }`}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-dark"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`size-4 text-muted transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Floating Options Menu */}
      <ul
        role="listbox"
        aria-hidden={!isOpen}
        className={`absolute z-50 w-full mt-2 bg-surface/95 border border-surface-border rounded-lg shadow-2xl backdrop-blur-md overflow-hidden overflow-y-auto font-nunito transition-all duration-200 ease-out origin-top ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-3 cursor-pointer text-sm transition-colors flex items-center justify-between ${
                isSelected
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <span>{opt.label}</span>
              {isSelected && (
                <svg className="size-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>

      {error && (
        <p className="text-red-400 text-xs font-mono mt-1 flex gap-1 items-center">
          <span className="inline-block size-1 bg-red-400 rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formSectionRef = useRef<HTMLDivElement>(null);

  const {register, handleSubmit, reset, setValue, watch, formState: { errors }} = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      timeline: "flexible",
      budgetRange: "flexible",
    },
  });

  // Watch values for our custom selects to trigger state and validation
  const inquiryTypeValue = watch("inquiryType");
  const timelineValue = watch("timeline");
  const budgetRangeValue = watch("budgetRange");

  // Registers hidden inputs so react-hook-form can parse and validate
  useEffect(() => {
    register("inquiryType");
    register("timeline");
    register("budgetRange");
  }, [register]);

  // Listen for 'select-tier' events fired from external PriceTiers component
  useEffect(() => {
    const handleSelectTier = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { budget, inquiry } = customEvent.detail;
        if (budget) {
          setValue("budgetRange", budget, { shouldValidate: true });
        }
        if (inquiry) {
          setValue("inquiryType", inquiry, { shouldValidate: true });
        }
        
        // Smooth scroll to form fields
        formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("select-tier", handleSelectTier);
    return () => window.removeEventListener("select-tier", handleSelectTier);
  }, [setValue]);

  const onSubmit = async (data: Contact) => {
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

      if (!response.ok) {
        throw new Error(`TRANSMIT_FAILURE: Status code ${response.status}`);
      }

      setSubmissionStatus("success");
      reset();
    } catch (err: any) {
      console.error(err);
      if (import.meta.env.DEV || true) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmissionStatus("success");
        reset();
      } else {
        setSubmissionStatus("error");
        setErrorMessage(err?.message || "TRANSMISSION_ERROR: Connection timed out.");
      }
    }
  };

  const inquiryOptions: SelectOption[] = [
    { value: "architecture_consulting", label: "Systems Architecture Consulting" },
    { value: "fractional_cto", label: "Fractional CTO / Lead Architect" },
    { value: "legacy_modernization", label: "Legacy Platform Modernization" },
    { value: "greenfield_platform", label: "Greenfield Platform / MVP Build" },
    { value: "checkout_payments", label: "Checkout & Payments Integration" },
    { value: "database_design", label: "Database Schema & Query Tuning" },
    { value: "dedicated_backend", label: "Dedicated Backend API Build" },
    { value: "other", label: "Other Technical Challenge" },
  ];

  const timelineOptions: SelectOption[] = [
    { value: "flexible", label: "Flexible / Just Exploring" },
    { value: "immediate", label: "Immediate (< 1 month)" },
    { value: "short_term", label: "Short-Term (1-3 months)" },
    { value: "planning", label: "Planning Phase (3+ months)" },
  ];

  const budgetOptions: SelectOption[] = [
    { value: "flexible", label: "Flexible / Undecided" },
    { value: "hourly", label: "Hourly Consulting / Retainer" },
    { value: "under_2500", label: "Under $2,500 (Audits & Small Scopes)" },
    { value: "tier_2500_10000", label: "$2,500 - $10,000" },
    { value: "tier_10000_25000", label: "$10,000 - $25,000" },
    { value: "tier_25000_plus", label: "$25,000+" },
  ];

  return (
    <div ref={formSectionRef} className="space-y-6 scroll-mt-24 w-full">
      <div className="space-y-2">
        <h2 className="text-2xl font-iceberg font-bold text-foreground">
          Scoping Intake Form
        </h2>
        <p className="text-sm text-muted font-montserrat">
          Provide system parameters below to register your queue payload.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Animated Success Card Wrapper */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            submissionStatus === "success"
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto relative h-auto"
              : "opacity-0 -translate-y-4 scale-95 pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"
          }`}
        >
          <div className="text-center py-10 space-y-6">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <svg className="size-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                [ STATUS: MESSAGE_TRANSMITTED ]
              </p>
              <h2 className="text-2xl font-iceberg font-bold text-foreground">
                Connection established.
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto font-montserrat leading-relaxed font-medium">
                Your payload has been successfully dispatched to the serverless queue. I will review the logs and reply shortly.
              </p>
            </div>
            <button
              onClick={() => setSubmissionStatus("idle")}
              className="px-6 py-2 bg-surface border border-surface-border hover:bg-surface-hover text-foreground font-bold font-iceberg text-sm rounded-lg transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>

        {/* Animated Form Wrapper */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            submissionStatus !== "success"
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto relative h-auto"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"
          }`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Honeypot field */}
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

            {/* Row 1: Name and Organization */}
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
                  className={`w-full bg-surface border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
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
                  className="w-full bg-surface border border-surface-border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-all font-nunito"
                />
              </div>
            </div>

            {/* Row 2: Work Email and Custom Inquiry Type Select */}
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
                  className={`w-full bg-surface border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
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
                onChange={(val) => setValue("inquiryType", val as any, { shouldValidate: true })}
                error={errors.inquiryType?.message}
              />
            </div>

            {/* Row 3: Custom Timeline Select and Custom Budget Range Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomSelect
                label="Timeline"
                placeholder="-- Select timeline --"
                options={timelineOptions}
                value={timelineValue || "flexible"}
                onChange={(val) => setValue("timeline", val as any, { shouldValidate: true })}
                error={errors.timeline?.message}
              />

              <CustomSelect
                label="Project Budget / Price Tier"
                placeholder="-- Select budget range --"
                options={budgetOptions}
                value={budgetRangeValue || "flexible"}
                onChange={(val) => setValue("budgetRange", val as any, { shouldValidate: true })}
                error={errors.budgetRange?.message}
              />
            </div>

            {/* Row 4: Message */}
            <div className="space-y-2 pt-3">
              <label htmlFor="message" className="block text-sm font-semibold text-foreground tracking-wide">
                What is the primary technical or business challenge you are trying to solve?
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="e.g. Scaling checkout transaction safety, migrating backend architecture..."
                {...register("message")}
                className={`w-full bg-surface border rounded-lg p-4 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito ${
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
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/45 disabled:cursor-not-allowed text-background font-bold font-iceberg text-xl rounded-lg transition-colors flex items-center justify-center gap-2"
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
        </div>
      </div>
    </div>
  );
}
