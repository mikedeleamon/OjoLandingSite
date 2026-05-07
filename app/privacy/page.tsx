import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL, APP_NAME, EFFECTIVE_DATE } from "@/lib/constants";

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
        subtitle="We take your privacy seriously. Here's exactly what we collect, why, and how to remove it."
      />

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-8 md:p-10 legal-prose">

          <p>
            <strong style={{ color: "white" }}>Effective Date:</strong>{" "}
            {EFFECTIVE_DATE}
          </p>
          <p>
            This Privacy Policy describes how {APP_NAME} ("we," "us," or "our")
            collects, uses, and shares information when you use the OJO mobile
            application (the "App") and our associated website. By using OJO,
            you agree to the collection and use of information as described in
            this policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Account Information</h3>
          <p>
            When you create an account, we collect your email address and a
            securely hashed version of your password. Passwords are hashed using
            bcrypt before storage — we never store plaintext credentials.
            Authentication is managed using JSON Web Tokens (JWT) which are
            stored locally on your device using secure storage.
          </p>

          <h3>Closet & Clothing Data</h3>
          <p>
            OJO stores the clothing articles you add to your closets, including
            item type (e.g., shirt, jacket), color, fabric, and any metadata you
            provide. This data is stored in our cloud database and linked to your
            account.
          </p>

          <h3>Clothing Images</h3>
          <p>
            If you upload photos of clothing items, those images are stored in
            our database associated with your account. We do not use your
            clothing images for any purpose other than displaying them within
            your closet.
          </p>

          <h3>Outfit History</h3>
          <p>
            When you mark an outfit as worn, we record that event along with a
            timestamp. This data is used to power outfit history features and
            avoid repetitive suggestions.
          </p>

          <h3>User Preferences & Settings</h3>
          <p>
            We store your app preferences including preferred temperature unit
            (°F or °C), preferred closet selection, humidity thresholds, and
            other outfit preference settings. These are persisted to our
            database and may also be temporarily cached in your device's session
            or local storage for performance.
          </p>

          <h3>Location Data</h3>
          <p>
            OJO requests access to your device's location in order to fetch
            accurate, localized weather data. Your precise location coordinates
            are transmitted to AccuWeather's API to retrieve current conditions
            and forecasts. We do not persistently store your exact GPS
            coordinates. Your approximate city or region may be cached briefly
            for performance.
          </p>

          <h3>Device & Usage Information</h3>
          <p>
            We may collect basic usage information such as app version, device
            operating system, and anonymized error logs to help us diagnose
            issues and improve the app. We do not use advertising identifiers or
            fingerprinting.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Authenticate and maintain your account</li>
            <li>Generate personalized outfit recommendations based on your closet and local weather</li>
            <li>Display your closet, outfit history, and preferences</li>
            <li>Sync your data across devices when you're signed in</li>
            <li>Improve app performance, fix bugs, and develop new features</li>
            <li>Respond to your support requests</li>
            <li>Send transactional emails (e.g., password resets) — we do not send marketing emails without explicit consent</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>OJO integrates with the following third-party services:</p>

          <h3>AccuWeather</h3>
          <p>
            We use the AccuWeather API to retrieve current weather conditions,
            hourly forecasts, and daily forecasts based on your location. When
            you open the app, your device coordinates are forwarded to
            AccuWeather through our server proxy. AccuWeather's use of this
            data is governed by{" "}
            <a href="https://www.accuweather.com/en/privacy" target="_blank" rel="noopener noreferrer">
              AccuWeather's Privacy Policy
            </a>
            .
          </p>

          <h3>MongoDB Atlas (Database)</h3>
          <p>
            Your account data, closet data, outfit history, and preferences are
            stored in a MongoDB Atlas cloud database. MongoDB Atlas operates
            under SOC 2 Type II compliance. Data is stored in encrypted form at
            rest and in transit.
          </p>

          <h3>Hosting & Infrastructure</h3>
          <p>
            Our backend API is hosted on a cloud infrastructure provider. All
            data transmission between the app and our servers uses HTTPS/TLS
            encryption.
          </p>

          <p>
            We do not sell your personal data to third parties. We do not share
            your data with advertisers.
          </p>

          <h2>4. Data Storage & Security</h2>
          <p>
            Your data is stored on secure cloud servers. We implement
            industry-standard security practices including:
          </p>
          <ul>
            <li>HTTPS/TLS encryption for all data in transit</li>
            <li>bcrypt password hashing with salt rounds</li>
            <li>JWT-based authentication with token expiration</li>
            <li>Database-level encryption at rest</li>
          </ul>
          <p>
            While we take reasonable steps to protect your information, no
            method of transmission over the internet or electronic storage is
            100% secure. We cannot guarantee absolute security.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong style={{ color: "white" }}>Access</strong> — request a copy of the personal data we hold about you
            </li>
            <li>
              <strong style={{ color: "white" }}>Correction</strong> — request correction of inaccurate data
            </li>
            <li>
              <strong style={{ color: "white" }}>Deletion</strong> — request deletion of your account and all associated data
            </li>
            <li>
              <strong style={{ color: "white" }}>Portability</strong> — request your data in a portable format
            </li>
            <li>
              <strong style={{ color: "white" }}>Opt-out</strong> — opt out of non-essential data collection at any time
            </li>
          </ul>
          <p>
            To exercise any of these rights, visit our{" "}
            <a href="/delete-account">Delete Account</a> page or contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. If you
            delete your account, we will remove your personal data, closet
            contents, outfit history, and preferences from our systems within
            30 days. Some anonymized, aggregated data may be retained for
            analytics purposes.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            OJO is not directed at children under the age of 13. We do not
            knowingly collect personal information from children under 13. If
            you believe we have inadvertently collected information from a child
            under 13, please contact us immediately at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will update the effective date at the top of this page and, where
            appropriate, notify you via email or in-app notification. Continued
            use of the App after changes constitutes your acceptance of the
            updated policy.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle
            your data, please contact us at:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
