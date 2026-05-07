import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL, APP_NAME, EFFECTIVE_DATE, COMPANY_NAME, WEBSITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${APP_NAME}'s Privacy Policy — how we collect, use, and protect your personal data.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Ojo Wardrobe App"
      />

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-8 md:p-10 legal-prose">

          <p>
            <strong style={{ color: "white" }}>Effective Date:</strong>{" "}
            {EFFECTIVE_DATE}
          </p>

          {/* ── 1. Introduction ── */}
          <h2>1. Introduction</h2>
          <p>
            Welcome to Ojo ("we," "our," or "us"). We are committed to
            protecting the privacy of every user of our mobile wardrobe
            application ("the App"). This Privacy Policy explains what personal
            information we collect, why we collect it, how we use and protect
            it, and what choices you have regarding your data.
          </p>
          <p>
            By downloading or using the App, you agree to the collection and
            use of your information as described in this policy. If you do not
            agree, please do not use the App.
          </p>
          <p>
            Developer / Data Controller: {COMPANY_NAME} · Contact email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · Website:{" "}
            <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer">
              {WEBSITE_URL}
            </a>
          </p>

          {/* ── 2. Information We Collect ── */}
          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide Directly</h3>
          <p>
            When you create an account or use the App, you may provide:
          </p>

          <h3>2.2 Information Collected Automatically</h3>
          <p>When you use the App, we may automatically collect:</p>

          <ul>
            <li>
              <strong style={{ color: "white" }}>Email address</strong> — used
              to create and authenticate your account
            </li>
            <li>
              <strong style={{ color: "white" }}>Username</strong> — a display
              name of your choosing
            </li>
            <li>
              <strong style={{ color: "white" }}>Location (city name)</strong>{" "}
              — entered manually to retrieve local weather data for outfit
              suggestions
            </li>
            <li>
              <strong style={{ color: "white" }}>
                Clothing and wardrobe data
              </strong>{" "}
              — descriptions, categories, colours, fabrics, and images of
              clothing items
            </li>
            <li>
              <strong style={{ color: "white" }}>Outfit wear history</strong>{" "}
              — records of which outfit suggestions you marked as "Wore this
              today"
            </li>
            <li>
              <strong style={{ color: "white" }}>Device information</strong> —
              device model, OS version, and app version
            </li>
            <li>
              <strong style={{ color: "white" }}>Usage analytics</strong> —
              feature interactions and session duration (aggregated and
              anonymised)
            </li>
            <li>
              <strong style={{ color: "white" }}>Crash reports</strong> — error
              logs to help us identify and fix bugs
            </li>
          </ul>

          <h3>2.3 Information We Do NOT Collect</h3>
          <p>
            We do not collect financial or payment information, real-time GPS
            location, social media profiles, or biometric data of any kind.
          </p>

          {/* ── 3. How We Use Your Information ── */}
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect solely to operate and improve the
            App: account creation and authentication; generating personalised
            outfit suggestions based on your closet, preferences, and local
            weather; remembering your style preferences and outfit history
            across sessions; and diagnosing crashes.
          </p>
          <p>
            We do not use your data for advertising, and we do not sell your
            personal information to any third party.
          </p>

          {/* ── 4. How We Store and Protect Your Information ── */}
          <h2>4. How We Store and Protect Your Information</h2>
          <p>
            Your account data, closets, and clothing articles are stored in
            MongoDB Atlas, a cloud database service. All data is transmitted
            over HTTPS/TLS encrypted connections. We implement access controls
            limiting database access to authorised systems only.
          </p>
          <p>
            No method of electronic storage or transmission is 100% secure. If
            a breach occurs that is likely to affect your rights, we will notify
            you promptly.
          </p>

          {/* ── 5. Third-Party Services ── */}
          <h2>5. Third-Party Services</h2>
          <p>
            The App uses a limited number of third-party services to function:
          </p>
          <ul>
            <li>
              <strong style={{ color: "white" }}>AccuWeather API</strong> —
              used to retrieve weather conditions for your specified city. Your
              city name is sent to AccuWeather to fetch local weather data.
            </li>
            <li>
              <strong style={{ color: "white" }}>MongoDB Atlas</strong> — cloud
              database provider used to store your account and wardrobe data.
            </li>
          </ul>

          {/* ── 6. Data Sharing and Disclosure ── */}
          <h2>6. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, or trade your personal information. We may
            disclose your information only in these limited circumstances:
          </p>
          <ul>
            <li>
              <strong style={{ color: "white" }}>Service providers:</strong>{" "}
              Third-party vendors (e.g., MongoDB Atlas) under strict
              confidentiality obligations.
            </li>
            <li>
              <strong style={{ color: "white" }}>Legal compliance:</strong> If
              required by law, court order, or governmental authority.
            </li>
            <li>
              <strong style={{ color: "white" }}>Safety:</strong> To protect
              the rights, property, or safety of our users or the public.
            </li>
            <li>
              <strong style={{ color: "white" }}>Business transfer:</strong> If
              we merge with or are acquired by another company, with advance
              notice to you.
            </li>
          </ul>

          {/* ── 7. Data Retention ── */}
          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is
            active. Account data and wardrobe data are kept until you delete
            your account. Outfit wear history is retained for up to{" "}
            <strong style={{ color: "white" }}>12 months</strong>. When you
            delete your account, all personally identifiable data is permanently
            removed within{" "}
            <strong style={{ color: "white" }}>30 days</strong>.
          </p>

          {/* ── 8. Your Privacy Rights ── */}
          <h2>8. Your Privacy Rights</h2>

          <h3>8.1 All Users</h3>
          <p>
            You may access, correct, or delete your data at any time within the
            App. To request a downloadable copy of your data, contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>

          <h3>8.2 California Residents (CCPA)</h3>
          <p>
            California residents have the right to know what personal
            information we collect, request its deletion, opt out of its sale
            (note: we do not sell data), and not be discriminated against for
            exercising these rights.
          </p>

          {/* ── 9. Children's Privacy ── */}
          <h2>9. Children's Privacy</h2>
          <p>
            The App is not intended for children under the age of 13 and
            complies with the Children's Online Privacy Protection Act (COPPA).
            We do not knowingly collect personal information from children under
            13. If you believe your child has provided us information, contact
            us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and
            we will delete it promptly.
          </p>
          <p>Users aged 13–17 may use the App with parental awareness.</p>

          {/* ── 10. Changes to This Privacy Policy ── */}
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the Effective Date and notify you
            via in-app notification or email. Your continued use of the App
            after changes constitutes acceptance.
          </p>

          {/* ── 11. Contact Us ── */}
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to
            respond within 30 calendar days.
          </p>

        </div>
      </div>
    </div>
  );
}
