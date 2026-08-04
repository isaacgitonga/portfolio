import {useEffect, useRef, useState} from "react";
import {actions, isInputError} from "astro:actions";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type Inquiry, InquirySchema, type ServiceType} from "@/schema/inquiry.schema.ts";
import CustomSelect from "@/components/react/CustomSelect.tsx";

const serviceNames: Record<string, string> = {
  'backend-infra': 'Resilient Backend & API Infrastructure',
  'identity-access': 'Enterprise Identity & Access Control (RBAC/ABAC)',
  'payment-billing': 'Idempotent Payment & Billing Architectures',
  'admin-consoles': 'Data-Dense Admin Consoles & Real-Time Sync',
  'risk-auditing': 'Architectural Risk Auditing & Consultation',
  'deterministic-rag': 'Deterministic RAG & Secure Agent Integration',
};

const validServiceIds = Object.keys(serviceNames);

export default function InquiryForm() {
  const [serverState, setServerState] = useState<{ success: boolean; message: string | null }>({ success: false, message: null });
  const [inquiryService, setInquiryService] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const { control, register, handleSubmit, reset, setValue, setError, formState: { errors, isSubmitting } } = useForm<Inquiry>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      message: "",
      service: null,
      inquiryType: null,
    }
  });

  useEffect(() => {
    register("inquiryType");
  }, [register]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");

    if (serviceParam && validServiceIds.includes(serviceParam)) {
      setValue('service', serviceParam as ServiceType);
      setInquiryService(serviceParam);
    }
  }, []);

  const clearSelectedService = () => {
    setInquiryService(null);
    setValue("service", null);

    const url = new URL(window.location.href);
    url.searchParams.delete("service");

    window.history.replaceState({}, "", url.toString());
  };

  const onSubmit = async (data: Inquiry) => {
    setServerState({ success: false, message: null });

    if (data.botCheck) {
      setServerState({ success: true, message: "Message send successfully." });
      return;
    }

    const { data: resData, error } = await actions.inquire(data);

    if (isInputError(error)) {
      Object.entries(error.fields).forEach(([fieldName, messages]) => {
        if (messages && messages.length > 0) {
          setError(fieldName as keyof Inquiry, {
            type: 'server',
            message: messages[0],
          });
        }
      });

      return;
    }

    if (error) {
      setServerState({ success: false, message: "Failed to submit inquiry." });
      return;
    }

    if (resData) {
      setServerState({ success: true, message: resData.message });
      reset();
    }
  };

  const handleResetForm = () => {
    setServerState({ success: false, message: null });
    reset();
    setInquiryService(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("service");
    window.history.replaceState({}, "", url.toString());
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inquiryOptions = [
    { value: "architecture_consulting", label: "Systems Architecture & Risk Auditing" },
    { value: "fractional_cto", label: "Fractional CTO & Technical Leadership" },
    { value: "dedicated_backend", label: "Dedicated Backend & Infrastructure Build" },
    { value: "api_design", label: "API Design & Integration" },
    { value: "database_design", label: "Database Design & Query Performance" },
    { value: "greenfield_platform", label: "Greenfield Platform & MVP Builds" },
    { value: "ai_automation", label: "AI, Agents & Workflow Automation" },
    { value: "data_heavy_ui", label: "Data-Heavy UI & State Management" },
    { value: "general_inquiry", label: "General Inquiry" },
  ];

  return (
    <div ref={formSectionRef} className="space-y-6 scroll-mt-24 w-full">
      <div className="space-y-2 pb-2 border-b border-surface-border/50">
        <h2 className="text-2xl font-iceberg font-bold text-foreground">
          {serverState.success ? "Message Transmitted" : "Scoping Intake Form"}
        </h2>
        <p className="text-sm text-muted font-montserrat">
          {serverState.success ? "[ STATUS: INQUIRY_SENT ]" : "Provide parameters below to register your queue payload."}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {serverState.success && serverState.message ? (
          <div className="text-center py-10 space-y-6 animate-fadeIn">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <svg className="size-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-iceberg font-bold text-foreground">
                Inquiry Sent.
              </h2>
              <p className="text-muted text-sm max-w-md mx-auto font-montserrat leading-relaxed font-medium">
                Your inquiry has been successfully sent. You can expect a response within 12 hours.
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
            <input
              type="text"
              {...register("botCheck")}
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {!serverState.success && serverState.message && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg font-mono text-xs flex gap-2 items-center">
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{serverState.message}</span>
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



              {inquiryService ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                      Selected Service
                    </label>
                    <button
                      type="button"
                      onClick={clearSelectedService}
                      className="text-xs text-primary hover:text-primary-hover font-mono underline cursor-pointer"
                    >
                      Clear / General Inquiry
                    </button>
                  </div>
                  <Controller
                    name='service'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        disabled
                        value={serviceNames[inquiryService]}
                        className="w-full bg-surface border border-surface-border rounded-lg p-4 text-primary font-montserrat font-bold text-sm truncate"
                      />
                    )}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                    Inquiry Type
                  </label>

                  <Controller
                    name="inquiryType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        placeholder="-- Select inquiry type --"
                        options={inquiryOptions}
                        value={field.value || ""}
                        onChange={(val) => field.onChange(val)}
                        error={errors.inquiryType?.message}
                      />
                    )}
                  />

                  <p className='text-sm text-muted'>What category does your inquiry fall into?</p>

                  {errors.inquiryType && (
                    <p className="text-red-400 text-xs font-mono mt-1 flex gap-1 items-center">
                      <span className="inline-block size-1 bg-red-400 rounded-full" />
                      {errors.inquiryType.message}
                    </p>
                  )}
                </div>
              )}
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
              disabled={isSubmitting}
              className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-primary/45 disabled:cursor-not-allowed text-background font-bold font-iceberg text-xl rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-background" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Inquire</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
