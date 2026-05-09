"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail, Cloud, Shirt, Lock, FolderOpen, Camera, Trash2, Zap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL } from "@/lib/constants";
import type { Metadata } from "next";

const categories = [
  {
    icon: Zap,
    label: "Getting Started",
    faqs: [
      {
        q: "How do outfit suggestions work?",
        a: "OJO reads your local weather forecast — including temperature, feels-like temperature, humidity, and wind — and cross-references it against the clothing articles in your active closet. It then scores each article's suitability for the conditions and assembles a recommended outfit. On days with wide temperature swings, OJO's Layering Intelligence Engine also tells you which layers you can shed mid-day and when.",
      },
      {
        q: "Do I need to create an account?",
        a: "Yes, an account is required to save and sync your closets. Your closet data, outfit history, and preferences are stored in the cloud so they're available across devices and restored if you reinstall the app.",
      },
    ],
  },
  {
    icon: Cloud,
    label: "Weather",
    faqs: [
      {
        q: "Why isn't weather loading?",
        a: "Weather requires location access. Check that OJO has permission to access your location in your device's Settings → Privacy → Location Services → OJO. If permissions are correct, try force-quitting the app and reopening it. If the issue persists, your device may have a network connectivity problem — try switching between Wi-Fi and cellular.",
      },
      {
        q: "The weather data seems wrong for my area.",
        a: "OJO uses AccuWeather's real-time data, which is generally very accurate. If the data looks off, try refreshing by pulling down on the main screen. In rare cases, AccuWeather may not have a nearby station — contact us and we'll investigate.",
      },
      {
        q: "Can I see a multi-day forecast?",
        a: "Yes — tap the weather section on the main screen to expand the full forecast view, which includes hourly and daily breakdowns.",
      },
    ],
  },
  {
    icon: FolderOpen,
    label: "Closets",
    faqs: [
      {
        q: "How do I manage multiple closets?",
        a: "In the Closets tab, tap the + button to create a new closet. You can name closets (e.g., \"Summer\", \"Work\", \"Travel\") and switch your preferred closet at any time from the closet detail screen. OJO will only suggest outfits from your currently active closet.",
      },
      {
        q: "Can I have more than one preferred closet?",
        a: "Currently OJO supports one active (preferred) closet at a time for outfit suggestions. Future updates may include multi-closet blending. You can have as many closets saved as you like.",
      },
      {
        q: "What clothing types does OJO recognize?",
        a: "OJO supports shirts, t-shirts, pants, jeans, shorts, jackets, coats, hoodies, sweaters, dresses, skirts, and shoes. When adding an article, you can also specify fabric type (cotton, wool, synthetic, etc.) and color — both improve suggestion accuracy.",
      },
    ],
  },
  {
    icon: Camera,
    label: "Photos",
    faqs: [
      {
        q: "How do I upload clothing photos?",
        a: "When adding a clothing article, tap the image placeholder to open your photo library or take a new photo with your camera. OJO will need photo library and camera permissions for this — you can grant them in Settings → Privacy on your device.",
      },
      {
        q: "Are my photos stored securely?",
        a: "Yes. Your clothing photos are stored encrypted in our cloud database and are only accessible to your account. We do not use your photos for any purpose beyond displaying them in your closet. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    icon: Lock,
    label: "Account & Security",
    faqs: [
      {
        q: "How do I reset my password?",
        a: "On the login screen, tap \"Forgot password?\" and enter your email address. You'll receive a reset link within a few minutes. Check your spam folder if it doesn't arrive. If you're still unable to reset, contact us at the support email below.",
      },
      {
        q: "Can I change my email address?",
        a: "Yes — go to Account → Profile and tap your email address to update it. You'll need to verify the new address before the change takes effect.",
      },
      {
        q: "How do I change my temperature unit (°F / °C)?",
        a: "Go to Settings → Preferences → Temperature Unit and select your preferred unit. The change applies immediately throughout the app.",
      },
    ],
  },
  {
    icon: Trash2,
    label: "Account Deletion",
    faqs: [
      {
        q: "How do I delete my account?",
        a: "Visit our Delete Account page for step-by-step instructions, or email us directly from your registered email address with the subject line \"Delete My Account.\" We'll process your request within 30 days.",
      },
      {
        q: "What happens to my data when I delete my account?",
        a: "All your personal data — email, closets, clothing articles, outfit history, photos, and preferences — is permanently deleted from our systems within 30 days of your confirmed deletion request. This action cannot be undone.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  // useId generates a stable, unique id per instance — required to link
  // aria-controls on the button to the id on the answer region (WCAG 1.3.1).
  const uid      = useId();
  const answerId = `faq-answer-${uid.replace(/:/g, '')}`;
  const shouldReduce = useReducedMotion();

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-4 min-h-[44px] text-left group"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-white font-dm font-medium text-sm leading-relaxed group-hover:text-white/90 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/50 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            aria-label={q}
            initial={shouldReduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/65 text-sm font-dm leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Help Center"
        title="How can we help?"
        subtitle="Quick answers to common questions. Can't find what you're looking for? Email us and we'll get back to you within 48 hours."
      />

      <div className="max-w-2xl mx-auto px-6 pb-24 flex flex-col gap-6">

        {/* FAQ sections */}
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.label} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 glass-strong rounded-xl flex items-center justify-center">
                  <Icon size={15} className="text-white" strokeWidth={1.8} />
                </div>
                <h2 className="font-outfit font-semibold text-white">{cat.label}</h2>
              </div>
              <div>
                {cat.faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Contact section */}
        <div className="glass-strong rounded-3xl p-7 text-center">
          <div className="w-11 h-11 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={18} className="text-white" strokeWidth={1.8} />
          </div>
          <h2 className="font-outfit font-bold text-white text-xl mb-2">
            Still need help?
          </h2>
          <p className="text-white/65 text-sm font-dm leading-relaxed mb-5 max-w-sm mx-auto">
            Send us a message and we'll get back to you within 24–48 hours on
            business days. Include your device model and iOS version for faster
            support.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=OJO%20Support%20Request`}
            className="inline-flex items-center gap-2 bg-white text-teal-600 font-outfit font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
          >
            <Mail size={14} />
            {SUPPORT_EMAIL}
          </a>
          <p className="text-white/40 text-xs font-dm mt-4">
            Response time: 24–48 business hours
          </p>
        </div>

      </div>
    </div>
  );
}
