import type { Metadata } from "next";
import { Trash2, Clock, ShieldCheck, AlertCircle, CheckCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Delete Account",
  description: `How to permanently delete your ${APP_NAME} account and all associated data.`,
};

const deletedItems = [
  "Your email address and account credentials",
  "All closets and clothing article data",
  "Uploaded clothing photos",
  "Outfit history and wear logs",
  "App preferences and settings",
  "Any other personal data linked to your account",
];

const steps = [
  {
    step: "1",
    title: "Open OJO on your device",
    description: "Launch the OJO app and make sure you're signed in to the account you want to delete.",
  },
  {
    step: "2",
    title: "Go to Account Settings",
    description: 'Tap the profile icon or navigate to Settings → Account to open your account page.',
  },
  {
    step: "3",
    title: "Select \"Delete Account\"",
    description: 'Scroll to the bottom of the Account page and tap "Delete Account." You\'ll be asked to confirm.',
  },
  {
    step: "4",
    title: "Confirm deletion",
    description: "Read the confirmation prompt carefully. Once confirmed, deletion begins immediately and cannot be undone.",
  },
];

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Account"
        title="Delete Your Account"
        subtitle="We'll permanently remove your account and all associated data. This action cannot be undone."
      />

      <div className="max-w-2xl mx-auto px-6 pb-24 flex flex-col gap-6">

        {/* Warning banner */}
        <div className="glass rounded-2xl p-5 flex items-start gap-4 border border-white/30">
          <AlertCircle size={20} className="text-white mt-0.5 flex-shrink-0" strokeWidth={1.8} />
          <div>
            <p className="text-white font-outfit font-semibold text-sm mb-1">Permanent action</p>
            <p className="text-white/70 text-sm font-dm leading-relaxed">
              Deleting your account is irreversible. All your closets, outfit
              history, and personal data will be permanently erased within 30 days.
              There is no way to recover this data after deletion.
            </p>
          </div>
        </div>

        {/* In-app steps */}
        <div className="glass rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center">
              <Trash2 size={16} className="text-white" strokeWidth={1.8} />
            </div>
            <h2 className="font-outfit font-semibold text-white text-lg">
              How to delete your account
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 glass-strong rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-outfit font-bold text-xs">{s.step}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-white/15 mt-2" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-white font-outfit font-semibold text-sm mb-1">{s.title}</p>
                  <p className="text-white/65 text-sm font-dm leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 glass-subtle rounded-xl px-4 py-3 flex items-start gap-2.5">
            <CheckCircle size={15} className="text-white/70 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
            <p className="text-white/65 text-xs font-dm leading-relaxed">
              In-app account deletion is coming in a future update. Until then, use
              the email method below to request deletion.
            </p>
          </div>
        </div>

        {/* Email method */}
        <div className="glass rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" strokeWidth={1.8} />
            </div>
            <h2 className="font-outfit font-semibold text-white text-lg">
              Request deletion by email
            </h2>
          </div>
          <p className="text-white/70 text-sm font-dm leading-relaxed mb-5">
            Send a deletion request from the email address registered to your
            account. Include "Delete My Account" in the subject line. We'll verify
            your identity and process the request within 30 days.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20My%20Account&body=Hi%2C%20I%20would%20like%20to%20permanently%20delete%20my%20OJO%20account%20and%20all%20associated%20data.%0A%0AAccount%20email%3A%20`}
            className="inline-flex items-center gap-2 bg-white text-teal-600 font-outfit font-semibold text-sm px-5 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            <Trash2 size={14} />
            Email deletion request
          </a>
          <p className="text-white/45 text-xs font-dm mt-4">
            Sending from a different email? Include your registered email address
            in the message body so we can locate your account.
          </p>
        </div>

        {/* What gets deleted */}
        <div className="glass rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 glass-strong rounded-xl flex items-center justify-center">
              <Clock size={16} className="text-white" strokeWidth={1.8} />
            </div>
            <h2 className="font-outfit font-semibold text-white text-lg">
              What gets deleted
            </h2>
          </div>
          <p className="text-white/70 text-sm font-dm leading-relaxed mb-5">
            Once your request is confirmed, the following data will be permanently
            deleted from our systems within <strong className="text-white">30 days</strong>:
          </p>
          <ul className="flex flex-col gap-2.5">
            {deletedItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-white/60 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <span className="text-white/75 text-sm font-dm">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 glass-subtle rounded-xl px-4 py-3">
            <p className="text-white/55 text-xs font-dm leading-relaxed">
              Some anonymized, aggregated analytics data not linked to your
              identity may be retained after deletion for product improvement
              purposes.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
