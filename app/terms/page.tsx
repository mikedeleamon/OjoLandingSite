import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL, APP_NAME, EFFECTIVE_DATE, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${APP_NAME}'s Terms of Service — the rules governing your use of the app and website.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Ojo Wardrobe App"
      />

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-lg p-8 md:p-10 legal-prose">

          <p>
            <strong style={{ color: "white" }}>Effective Date:</strong>{" "}
            {EFFECTIVE_DATE}
          </p>

          {/* ── 1. Acceptance of Terms ── */}
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Ojo ("the App"), you agree to be bound by
            these Terms of Service ("Terms") and our Privacy Policy. These
            Terms constitute a legally binding agreement between you and{" "}
            {COMPANY_NAME}. If you do not agree, do not use the App.
          </p>
          <p>
            We reserve the right to update these Terms at any time. Continued
            use of the App after changes take effect constitutes acceptance.
          </p>

          {/* ── 2. Description of the Service ── */}
          <h2>2. Description of the Service</h2>
          <p>
            Ojo is a mobile wardrobe management application. It allows you to
            create and manage a digital wardrobe, receive outfit suggestions
            generated from your wardrobe and local weather conditions, and track
            your outfit wear history. Garment recognition from photos you take
            runs on your device using an on-device machine learning model.
          </p>
          <p>
            The App also provides wardrobe insights and a weekly recap, wardrobe
            gap detection, optional trip planning and packing lists, Trip Mode,
            home-screen and lock-screen widgets, and optional push
            notifications. Individual features may be added, changed, or removed
            over time.
          </p>
          <p>
            The App's core features are free to use. Ojo Pro is an optional
            auto-renewing subscription described in Section 2.1. We reserve the
            right to modify, suspend, or discontinue any part of the App at any
            time without liability.
          </p>

          <h3>2.1 Ojo Pro Subscription</h3>
          <p>
            Ojo Pro is an optional, auto-renewing subscription that unlocks
            additional features, including saving more than one trip at a time
            in the Trip Planner and deeper wardrobe insights (Style DNA). The
            core outfit-suggestion, closet, and weather features described above
            remain free whether or not you subscribe.
          </p>
          <p>
            Subscription length and price are shown in the App and in your Apple
            App Store or Google Play account settings before you purchase, and
            may vary by promotion or region. Payment is charged to your Apple ID
            or Google Play account at confirmation of purchase.
          </p>
          <p>
            Your subscription automatically renews for the same length and price
            unless you cancel at least 24 hours before the end of the current
            period. Your account will be charged for renewal within 24 hours
            before the end of the current period. You can manage or cancel your
            subscription at any time in your Apple App Store or Google Play
            account settings — we cannot process a cancellation or refund on
            your behalf.
          </p>
          <p>
            Where a free trial or introductory offer is shown, any unused
            portion is forfeited if you purchase a subscription before the trial
            ends. Purchases and subscriptions are processed entirely by Apple or
            Google; we never receive your payment card details — see Section 5
            of our <a href="/privacy">Privacy Policy</a> for what our
            subscription-management provider, RevenueCat, does receive.
          </p>

          {/* ── 3. Eligibility ── */}
          <h2>3. Eligibility</h2>
          <p>
            You must be at least 13 years old to use the App. You must be a
            human user (automated access is prohibited). By using the App, you
            represent that you meet these requirements. Users aged 13–17
            represent that their parent or guardian has reviewed and consented
            to these Terms.
          </p>

          {/* ── 4. User Accounts ── */}
          <h2>4. User Accounts</h2>

          <h3>4.1 Account Creation</h3>
          <p>
            To use the App, you must create an account. You may do so with a
            valid email address, username, and password, or by using Sign in
            with Apple or Google Sign-In, in which case no separate password is
            created. You agree to provide accurate, current, and complete
            information.
          </p>

          <h3>4.2 Account Security</h3>
          <p>
            You are solely responsible for maintaining the confidentiality of
            your credentials, including the Apple or Google account you use to
            sign in. Notify us immediately at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> of any
            unauthorised use of your account.
          </p>

          <h3>4.3 Account Termination</h3>
          <p>
            You may delete your account at any time from Account Settings. We
            reserve the right to suspend or terminate your account for
            violations of these Terms.
          </p>

          {/* ── 5. Acceptable Use ── */}
          <h2>5. Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul>
            <li>Use the App for any unlawful purpose</li>
            <li>
              Attempt unauthorised access to the App or its servers
            </li>
            <li>Transmit malware or harmful code</li>
            <li>Scrape or use automated tools to extract data</li>
            <li>Reverse engineer any part of the App</li>
            <li>Harass or impersonate any person</li>
            <li>Upload illegal or infringing content</li>
            <li>Circumvent security or rate-limiting measures</li>
          </ul>

          {/* ── 6. Intellectual Property ── */}
          <h2>6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the App — including
            source code, UI, design, logos, and outfit suggestion algorithms —
            are owned by {COMPANY_NAME} and protected by applicable intellectual
            property laws.
          </p>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable
            licence to use the App on your personal device solely for personal
            wardrobe management. This licence does not permit copying,
            modifying, or distributing the App.
          </p>

          {/* ── 7. User-Provided Content ── */}
          <h2>7. User-Provided Content</h2>
          <p>
            You retain ownership of any clothing images and descriptions you
            upload ("User Content"). By uploading, you grant us a limited
            licence to store and display that content solely to provide the
            App's features to you.
          </p>
          <p>
            You represent that you own or have the rights to all User Content,
            that it does not infringe third-party rights, and that it does not
            contain illegal or harmful material.
          </p>
          <p>
            The App lets you share an outfit or donation list as an image to
            other apps, such as Instagram. Anything you choose to share that way
            leaves the App and becomes subject to the terms and privacy policy
            of the service you share it to. You decide what to share, and you are
            responsible for it once shared.
          </p>

          {/* ── 8. Third-Party Services and Links ── */}
          <h2>8. Third-Party Services and Links</h2>
          <p>
            The App relies on third-party services — including cloud hosting,
            image storage, weather data, push notification delivery, and email
            delivery — to function. Your use of the App is also subject to those
            providers' terms, and we are not responsible for their availability
            or performance. Weather data is provided by Apple Weather and may be
            inaccurate or unavailable.
          </p>
          <p>
            Where the App identifies a gap in your wardrobe, it may offer a
            "Shop" link that opens a shopping search in your browser. Those
            results come from a third party. We do not endorse, verify, or take
            responsibility for any merchant, product, price, or listing shown,
            we receive no commission from them, and any purchase you make is
            solely between you and that merchant.
          </p>

          {/* ── 9. Disclaimers and Warranties ── */}
          <h2>9. Disclaimers and Warranties</h2>
          <p>
            THE APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT
            WARRANTIES OF ANY KIND. We do not warrant that the App will be
            uninterrupted or error-free, that outfit suggestions will meet your
            expectations, or that weather data will be accurate.
          </p>
          <p>
            Outfit recommendations are generated automatically and are provided
            for personal convenience only. They do not constitute professional
            styling advice.
          </p>

          {/* ── 10. Limitation of Liability ── */}
          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW,{" "}
            {COMPANY_NAME.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING
            FROM YOUR USE OF THE APP.
          </p>
          <p>
            In no event shall our total liability exceed the greater of $100 or
            the amount you paid us in the twelve months preceding the claim.
          </p>

          {/* ── 11. Indemnification ── */}
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {COMPANY_NAME} from any
            claims, liabilities, damages, and expenses arising from your use of
            the App, your violation of these Terms, or your User Content.
          </p>

          {/* ── 12. Termination ── */}
          <h2>12. Termination</h2>
          <p>
            Either party may terminate this agreement at any time. You may
            terminate by deleting your account. We may terminate by disabling
            your account for violations of these Terms. Upon termination your
            licence to use the App immediately ceases.
          </p>

          {/* ── 13. Governing Law and Dispute Resolution ── */}
          <h2>13. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of the United States and the
            state in which {COMPANY_NAME} is domiciled. Disputes shall first be
            submitted to informal resolution via email at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. If
            unresolved, disputes shall be settled by binding arbitration under
            AAA rules. You waive any right to participate in a class-action
            lawsuit.
          </p>

          {/* ── 14. Changes to These Terms ── */}
          <h2>14. Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. When we make material
            changes, we will update the Effective Date and notify you via
            in-app notification or email.
          </p>

          {/* ── 15. Miscellaneous ── */}
          <h2>15. Miscellaneous</h2>
          <p>
            These Terms and our Privacy Policy constitute the entire agreement
            between you and us. If any provision is unenforceable, the
            remaining provisions continue in full force. Our failure to enforce
            any right does not constitute a waiver.
          </p>

          {/* ── 16. Contact Us ── */}
          <h2>16. Contact Us</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We aim to
            respond within 30 calendar days.
          </p>

        </div>
      </div>
    </div>
  );
}
