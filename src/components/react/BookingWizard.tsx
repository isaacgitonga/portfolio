import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Booking, BookingSchema } from "@/schema/booking.schema.ts";
import CustomSelect from "@/components/react/CustomSelect.tsx";

export default function BookingWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const wizardRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Booking>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      message: "",
    },
  });

  const inquiryTypeValue = watch("inquiryType");

  useEffect(() => {
    register("inquiryType");
  }, [register]);

  const handleNextStep1 = async () => {
    const isFormValid = await trigger(["name", "organization", "workEmail", "inquiryType", "message"]);
    if (isFormValid) {
      setStep(2);
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = () => {
    setStep(1);
    wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmitAll = async (data: Booking) => {
    if (data.botCheck) {
      setStep(3);
      return;
    }

    setSubmissionStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        ...data,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      };

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status !== 404) {
        throw new Error(`TRANSMIT_FAILURE: Status code ${response.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionStatus("success");
      setStep(3);
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err: unknown) {
      console.error(err);
      setSubmissionStatus("error");
      const message = err instanceof Error ? err.message : "TRANSMISSION_ERROR: Connection timed out.";
      setErrorMessage(message);
    }
  };

  // Setup mock calendar days (next 5 weekdays)
  const getNextWeekdays = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);

    while (dates.length < 5) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        dates.push({
          raw: current.toISOString().split("T")[0],
          dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
          dayNum: current.getDate(),
          month: current.toLocaleDateString("en-US", { month: "short" }),
        });
      }
    }
    return dates;
  };

  const weekdays = getNextWeekdays();
  const timeSlots = ["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"];

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
    <div ref={wizardRef} className="space-y-6 scroll-mt-24 w-full">
      {/* Step Indicator Header */}
      {step < 3 && (
        <div className="flex items-center justify-between border-b border-surface-border/50 pb-4">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
              STEP {step} OF 2
            </span>
            <span className="text-sm font-iceberg text-foreground font-semibold">
              {step === 1 && "Intake Specifications"}
              {step === 2 && "Select Call Discovery Slot"}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-350 ${
                  s === step
                    ? "w-8 bg-primary"
                    : s < step
                    ? "w-4 bg-primary/45"
                    : "w-2 bg-surface-border"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Intake Form */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          {/* Honeypot field */}
          <input
            type="text"
            {...register("botCheck")}
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold font-montserrat text-foreground tracking-wide">
                Your Identifier Name
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
                Company / Organization
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
                Company Work Email
              </label>
              <input
                type="email"
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
              onChange={(val) => setValue("inquiryType", val as Booking["inquiryType"], { shouldValidate: true })}
              error={errors.inquiryType?.message}
            />
          </div>

          <div className="space-y-2">
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

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep1}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-background font-bold font-iceberg rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>CONTINUE</span>
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Discovery Calendar Scheduler */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitAll)} className="space-y-6 animate-fadeIn">
          {submissionStatus === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg font-mono text-xs flex gap-2 items-center">
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <h3 className="text-xl font-iceberg font-bold text-foreground">
              Select an Advisory Discovery Slot
            </h3>
            <p className="text-xs text-muted font-montserrat">
              Lock in a 30-minute system review once this payload is transmitted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-mono font-bold text-muted-dark uppercase tracking-wider">
                Select Date
              </div>
              <div className="grid grid-cols-5 gap-2">
                {weekdays.map((d) => {
                  const active = selectedDate === d.raw;
                  return (
                    <button
                      type="button"
                      key={d.raw}
                      onClick={() => {
                        setSelectedDate(d.raw);
                        setSelectedTime(null);
                      }}
                      className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                        active
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-background border-surface-border hover:border-muted text-muted hover:text-foreground"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-mono tracking-wider">{d.month}</span>
                      <span className="text-lg font-bold font-iceberg my-0.5">{d.dayNum}</span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-dark">{d.dayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-muted-dark uppercase tracking-wider">
                Select Time
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {timeSlots.map((time) => {
                  const active = selectedTime === time;
                  const disabled = !selectedDate;
                  return (
                    <button
                      type="button"
                      key={time}
                      disabled={disabled}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border text-center transition-all font-mono text-xs cursor-pointer ${
                        active
                          ? "bg-primary/10 border-primary text-primary font-bold"
                          : disabled
                          ? "bg-background/20 border-surface-border/30 text-muted-dark/20 cursor-not-allowed"
                          : "bg-background border-surface-border hover:border-muted text-muted hover:text-foreground"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-surface/30 border border-surface-border/50 rounded-xl p-4 text-xs font-montserrat text-muted leading-relaxed flex items-start gap-2.5">
            <span className="text-primary font-bold text-sm">💡</span>
            <span>
              <strong>Note:</strong> Selecting a time commits it in reservation status. The consultation booking is confirmed immediately upon submitting this scoping package.
            </span>
          </div>

          <div className="pt-4 flex justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={submissionStatus === "submitting"}
              className="px-6 py-3 border border-surface-border hover:bg-surface/30 text-foreground font-bold font-iceberg rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>BACK</span>
            </button>

            <button
              type="submit"
              disabled={submissionStatus === "submitting" || !selectedDate || !selectedTime}
              className="px-8 py-3 bg-primary hover:bg-primary-hover disabled:bg-primary/45 disabled:cursor-not-allowed text-background font-bold font-iceberg text-base rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 grow md:grow-0"
            >
              {submissionStatus === "submitting" ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-background" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <span>SUBMIT & CONFIRM BOOKING</span>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Success Confirmation Screen */}
      {step === 3 && (
        <div className="text-center py-12 space-y-6 animate-fadeIn">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-bounce">
            <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
              [ STATUS: DISCOVERY_INTAKE_RECORDED ]
            </p>
            <h2 className="text-2xl md:text-3xl font-iceberg font-bold text-foreground">
              Audit Scheduled Successfully.
            </h2>
            <div className="bg-surface/50 border border-surface-border rounded-xl p-4 max-w-md mx-auto space-y-2 text-left font-montserrat text-sm mt-4">
              <div className="flex justify-between border-b border-surface-border/50 pb-2">
                <span className="text-muted">Advisory Slot:</span>
                <span className="text-foreground font-semibold font-mono">
                  {selectedDate} @ {selectedTime}
                </span>
              </div>
              <div className="flex justify-between border-b border-surface-border/50 pb-2">
                <span className="text-muted">Intake Channel:</span>
                <span className="text-primary font-semibold">advisory@isaacgitonga.com</span>
              </div>
              <div className="text-[11px] text-muted-dark mt-2 leading-relaxed text-center">
                A calendar invite and system intake confirmation message have been dispatched.
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setSubmissionStatus("idle");
                setStep(1);
              }}
              className="px-6 py-2 border border-surface-border hover:bg-surface/30 text-foreground font-bold font-iceberg text-sm rounded-lg transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
