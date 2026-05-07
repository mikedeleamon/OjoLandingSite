import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL, APP_NAME, EFFECTIVE_DATE } from "@/lib/constants";

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
        subtitle="Please read these terms carefully before using OJO."
      />

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-8 md:p-10 legal-prose">
          <p>
            <strong style={{ color: "white" }}>Effective Date:</strong>{" "}
            {EFFECTIVE_DATE}
          </p>
          <p>
            These Terms of Service ("Terms") govern your access to and use of
            the OJO mobile application, website, and related services
            (collectively, the "Service") operated by {APP_NAME} ("we," "us,"
            or "our"). By accessing or using the Service, you agree to be bound
            by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using OJO, you confirm that you are at
            least 13 years of age, that you have read and understood these
            Terms, and that you agree to be legally bound by them. If you are
            using OJO on behalf of an organization, you agree to these Terms on
            behalf of that organization.
          </p>

          <h2>2. Your Account</h2>
          <p>
            To use OJO, you must create an account with a valid email address
            and password. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activity that occurs under your account</li>
            <li>Notifying us immediately of any unauthorized account access at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </li>
          </ul>
          <p>
            We reserve the right to disable or suspend accounts that violate
            these Terms or engage in fraudulent activity.
          </p>

          <h2>3. Use of the Service</h2>
          <p>
            OJO grants you a limited, non-exclusive, non-transferable, revocable
            license to use the Service for your personal, non-commercial
            purposes. You agree not to:
          </p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
            <li>Attempt to reverse-engineer, decompile, or disassemble any part of the Service</li>
            <li>Scrape, crawl, or systematically extract data from the Service</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Attempt to gain unauthorized access to any systems or networks connected to the Service</li>
            <li>Transmit any malware, viruses, or other harmful code</li>
            <li>Use the Service in any way that could damage, disable, or impair the Service</li>
          </ul>

          <h2>4. User Content</h2>
          <p>
            OJO allows you to upload and store content including clothing
            photos, closet data, and personal preferences ("User Content"). You
            retain ownership of your User Content. By uploading content to OJO,
            you grant us a limited, worldwide, royalty-free license to store,
            process, and display your content solely for the purpose of
            providing the Service to you.
          </p>
          <p>
            You represent and warrant that your User Content does not infringe
            on the intellectual property rights of any third party and does not
            violate any applicable law.
          </p>
          <p>
            We do not claim ownership of your User Content and will not share it
            with third parties except as described in our Privacy Policy.
          </p>

          <h2>5. Weather Data & Outfit Recommendations</h2>
          <p>
            OJO's outfit suggestions are generated based on real-time weather
            data from AccuWeather and the clothing items in your closet. These
            recommendations are provided for informational and convenience
            purposes only. We make no guarantees about the accuracy,
            completeness, or suitability of any outfit recommendation. You
            exercise your own judgment in deciding what to wear.
          </p>
          <p>
            Weather data accuracy is subject to the limitations of third-party
            weather providers. We are not responsible for inaccurate weather
            data provided by AccuWeather or other data sources.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The Service, including all software, design, graphics, user
            interface, logos, and trademarks, is owned by or licensed to
            {APP_NAME} and is protected by applicable intellectual property
            laws. You may not reproduce, modify, distribute, or create
            derivative works from any part of the Service without our prior
            written consent.
          </p>

          <h2>7. Subscriptions & Payments</h2>
          <p>
            OJO may offer premium subscription tiers in the future. Any such
            subscriptions will be subject to additional pricing terms presented
            at the time of purchase. All purchases are processed through Apple's
            App Store or other authorized payment platforms. Refund policies are
            governed by those platforms' respective terms.
          </p>
          <p>
            We reserve the right to modify our pricing and subscription
            offerings at any time with reasonable notice.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST
            EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE
            WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {APP_NAME.toUpperCase()} SHALL
            NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL,
            ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN
            IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
            TOTAL LIABILITY TO YOU SHALL NOT EXCEED THE GREATER OF (A) $10 OR
            (B) THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>

          <h2>10. Account Termination</h2>
          <p>
            You may terminate your account at any time through the app's account
            settings or by visiting our{" "}
            <a href="/delete-account">Delete Account</a> page. We may suspend or
            terminate your account at our discretion if we determine you have
            violated these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service ceases immediately.
            We will delete your personal data in accordance with our Privacy
            Policy and applicable law.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time. When we make material
            changes, we will notify you through the app or by email. Continued
            use of the Service after changes take effect constitutes your
            acceptance of the revised Terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of [Your State], without regard to its conflict
            of law principles. Any disputes shall be resolved in the courts
            located in [Your Jurisdiction].
          </p>

          <h2>13. Contact</h2>
          <p>
            For questions about these Terms, please contact us at:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
