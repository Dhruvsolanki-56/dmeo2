import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContact } from "../../api/public";
import ConsentCheckbox from "../ConsentCheckbox";
import { trackFormSubmission } from "../../lib/siteMetrics";

const field =
  "w-full rounded-lg border border-primary-100 bg-white px-4 py-3 text-[0.98rem] text-ink transition-colors focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600";
const lbl = "mb-1.5 block text-sm font-medium text-ink";
const err = "mt-1 text-xs text-red-600";

/**
 * Paper band: heading and photo on the left, an underlined-field form on
 * the right. Posts to the same contact endpoint as the
 * Contact page, as a general enquiry.
 */
export default function ContactBand({ image = "/company_intro.png", heading = "Send us your requirement" }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      await submitContact({ ...data, inquiry_type: "general_contact" });
      trackFormSubmission("general_contact", "", 0);
      setDone(true);
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="container-page">
      <div className="grid gap-12 rounded-3xl bg-panel p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
        <div className="lg:col-span-5">
          <h2 className="font-display text-display-sm font-normal text-ink">{heading}</h2>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-slate-600">
            Tell us the products, quantities and markets you are working on, and our team will get back to you.
          </p>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <img src={image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        <div className="lg:col-span-7">
          {done ? (
            <div className="rounded-2xl bg-white p-8">
              <CheckCircle2 size={36} className="text-primary-600" />
              <p className="mt-4 font-display text-2xl font-normal text-ink">Thank you for reaching out.</p>
              <p className="mt-2 text-slate-600">Our team will get back to you shortly.</p>
              <button type="button" onClick={() => setDone(false)} className="btn-outline mt-6">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl bg-white p-6 shadow-soft sm:p-8" noValidate>
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("honeypot")} />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="cb-name" className={lbl}>Full name *</label>
                  <input id="cb-name" maxLength={150} autoComplete="name" className={field} {...register("name", { required: true })} />
                  {errors.name && <p className={err}>Name is required</p>}
                </div>
                <div>
                  <label htmlFor="cb-email" className={lbl}>Email address *</label>
                  <input
                    id="cb-email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                  />
                  {errors.email && <p className={err}>A valid email is required</p>}
                </div>
                <div>
                  <label htmlFor="cb-phone" className={lbl}>Phone number</label>
                  <input id="cb-phone" type="tel" autoComplete="tel" maxLength={40} className={field} {...register("phone")} />
                </div>
                <div>
                  <label htmlFor="cb-subject" className={lbl}>Subject</label>
                  <input id="cb-subject" maxLength={200} className={field} {...register("subject")} />
                </div>
              </div>
              <div>
                <label htmlFor="cb-message" className={lbl}>Message *</label>
                <textarea id="cb-message" rows={4} className={`${field} resize-none`} {...register("message", { required: true })} />
                {errors.message && <p className={err}>Message is required</p>}
              </div>
              <ConsentCheckbox register={register} errors={errors} id="cb-consent" />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3.5">
                {isSubmitting ? "Sending..." : "Send Requirement"} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
