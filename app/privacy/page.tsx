import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import {
    SUPPORT_EMAIL,
    APP_NAME,
    EFFECTIVE_DATE,
    COMPANY_NAME,
    WEBSITE_URL,
} from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: `${APP_NAME}'s Privacy Policy — how we collect, use, and protect your personal data.`,
};

export default function PrivacyPolicyPage() {
    return (
        <div className='min-h-screen'>
            <PageHeader
                eyebrow='Legal'
                title='Privacy Policy'
                subtitle='Ojo Wardrobe App'
            />

            <div className='max-w-3xl mx-auto px-6 pb-24'>
                <div className='glass rounded-3xl p-8 md:p-10 legal-prose'>
                    <p>
                        <strong style={{ color: 'white' }}>
                            Effective Date:
                        </strong>{' '}
                        {EFFECTIVE_DATE}
                    </p>

                    {/* ── 1. Introduction ── */}
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Ojo ("we," "our," or "us"). We are committed
                        to protecting the privacy of every user of our mobile
                        wardrobe application ("the App"). This Privacy Policy
                        explains what personal information we collect, why we
                        collect it, how we use and protect it, and what choices
                        you have regarding your data.
                    </p>
                    <p>
                        By downloading or using the App, you agree to the
                        collection and use of your information as described in
                        this policy. If you do not agree, please do not use the
                        App.
                    </p>
                    <p>
                        Developer / Data Controller: {COMPANY_NAME} · Contact
                        email:{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
                        · Website:{' '}
                        <a
                            href={WEBSITE_URL}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {WEBSITE_URL}
                        </a>
                    </p>

                    {/* ── 2. Information We Collect ── */}
                    <h2>2. Information We Collect</h2>

                    <h3>2.1 Information You Provide Directly</h3>
                    <p>
                        When you create an account or use the App, you may
                        provide:
                    </p>
                    <ul>
                        <li>
                            <strong style={{ color: 'white' }}>
                                First and last name
                            </strong>{' '}
                            — used to personalise your account
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Email address
                            </strong>{' '}
                            — used to create and authenticate your account
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>Username</strong>{' '}
                            — a display name of your choosing
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>Password</strong>{' '}
                            — if you sign up with email, your password is stored
                            only as a salted cryptographic hash. We never store
                            or have access to it in plain text. If you sign in
                            with Apple or Google instead, no password is created
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Date of birth
                            </strong>{' '}
                            — collected at sign-up to confirm you meet the
                            minimum age requirement described in Section 9
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Location
                            </strong>{' '}
                            — either a city name you enter manually, or, if you
                            choose "My Location," your device's GPS coordinates
                            read on demand at that moment. The coordinates for
                            the location you set are saved to your account so
                            that scheduled notifications, such as your morning
                            brief, can retrieve local weather while the App is
                            closed. If you turn on Trip Mode, the App also reads
                            your location on demand to detect when you have
                            arrived at a saved trip destination. We do not track
                            your location continuously or in the background, and
                            we do not keep a history of where you have been
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Style preferences
                            </strong>{' '}
                            — your clothing style, temperature and humidity
                            comfort thresholds, unit preferences, any additional
                            cities you save, and — only if you choose to provide
                            it — gender, which is used to tailor outfit
                            suggestions
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Clothing item photos and metadata
                            </strong>{' '}
                            — images you upload or capture of your garments,
                            plus descriptions, categories, colours, fabrics, and
                            (optionally) merchant and purchase price
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Outfit wear history
                            </strong>{' '}
                            — records of which outfit suggestions you marked as
                            "Wore this today," and the weather conditions at the
                            time, which is what allows the App to learn your
                            preferences
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Trip information (optional)
                            </strong>{' '}
                            — for trips you add, the airline, confirmation
                            number, travel dates, origin/destination airports,
                            and destination city, plus any outfit plans you
                            build for them
                        </li>
                    </ul>

                    <h3>2.2 Information Collected Automatically</h3>
                    <p>When you use the App, we may automatically collect:</p>
                    <ul>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Push notification token
                            </strong>{' '}
                            — a device-specific token used solely to deliver
                            notifications you have enabled (e.g. morning brief,
                            weather changes)
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Device information
                            </strong>{' '}
                            — device model, OS version, and app version
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Crash reports
                            </strong>{' '}
                            — error logs to help us identify and fix bugs
                        </li>
                    </ul>

                    <h3>2.3 Information We Do NOT Collect</h3>
                    <p>
                        We do not collect financial or payment information,
                        social media profiles, contacts, or biometric data of
                        any kind. We do not track your location in the
                        background, and we do not build an advertising profile
                        about you — see the Location entry above for exactly how
                        location is used.
                    </p>

                    <h3>2.4 Photo Recognition Happens On Your Device</h3>
                    <p>
                        When you photograph a garment, the App identifies what
                        it is — the garment type, its dominant colours, and a
                        best-guess fabric — using a machine-learning model that
                        runs entirely on your device. Your photo is not sent to
                        us or to any third party for that recognition step.
                        Images are uploaded to our image storage only so your
                        closet is backed up and available across your devices,
                        as described in Section 4.
                    </p>

                    {/* ── 3. How We Use Your Information ── */}
                    <h2>3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect solely to operate and
                        improve the App: account creation and authentication;
                        generating personalised outfit suggestions based on your
                        closet, preferences, and local weather; remembering your
                        style preferences and outfit history across sessions and
                        devices; producing your wardrobe insights and weekly
                        recap; identifying gaps in your closet relative to your
                        local weather; populating the home-screen and lock-screen
                        widgets; sending notifications you have enabled; powering
                        the optional trip planner and Trip Mode; and diagnosing
                        crashes.
                    </p>
                    <p>
                        We do not use your data for advertising, and we do not
                        sell your personal information to any third party.
                    </p>

                    {/* ── 4. How We Store and Protect Your Information ── */}
                    <h2>4. How We Store and Protect Your Information</h2>
                    <p>
                        Your account data, closet metadata, outfit history, and
                        trip information are stored in MongoDB Atlas, a cloud
                        database service. The images of your clothing items are
                        stored on Cloudflare R2, an object-storage service used
                        as our image CDN; image filenames are random identifiers
                        that contain no personal information. All data is
                        transmitted over HTTPS/TLS encrypted connections, and
                        access is limited to authorised systems.
                    </p>
                    <p>
                        Passwords are never stored in readable form — only as a
                        salted bcrypt hash. Authentication tokens are held in
                        your device's secure storage (iOS Keychain / Android
                        Keystore).
                    </p>
                    <p>
                        If you add an OJO widget to your home or lock screen, the
                        App writes a small snapshot — today's outfit, the
                        forecast, and thumbnail images — into a shared container
                        on your device so the widget can render without a network
                        call. That snapshot stays on your device and is removed
                        when you delete the App.
                    </p>
                    <p>
                        No method of electronic storage or transmission is 100%
                        secure. If a breach occurs that is likely to affect your
                        rights, we will notify you promptly.
                    </p>

                    {/* ── 5. Third-Party Services ── */}
                    <h2>5. Third-Party Services</h2>
                    <p>
                        The App uses a limited number of third-party services to
                        function. Each service receives only the data needed to
                        perform its role:
                    </p>
                    <ul>
                        <li>
                            <strong style={{ color: 'white' }}>
                                MongoDB Atlas
                            </strong>{' '}
                            — cloud database used to store your account, closet
                            metadata, outfit history, and trip information.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Cloudflare R2
                            </strong>{' '}
                            — object storage used to host the clothing item
                            images you upload or capture. Images are served via
                            CDN over HTTPS.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Apple WeatherKit
                            </strong>{' '}
                            — receives the latitude/longitude resolved from the
                            city you have set in order to return local weather
                            conditions. Apple does not receive your account
                            identifier. See{' '}
                            <a
                                href='https://weatherkit.apple.com/legal-attribution.html'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Apple's data-source attribution
                            </a>{' '}
                            for the full list of data sources.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Expo Push Notification Service
                            </strong>{' '}
                            — receives your device push token (and the contents
                            of the notifications you have enabled) so it can
                            deliver them to your device.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Sign in with Apple (optional)
                            </strong>{' '}
                            — if you choose to sign in with Apple, Apple returns
                            a stable identifier for your account and, on your
                            first sign-in only, your name and email address. If
                            you use Apple's "Hide My Email," we receive a private
                            relay address instead of your real one, and that is
                            all we ever see.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Google Sign-In (optional)
                            </strong>{' '}
                            — if you choose to sign in with Google, Google
                            returns your email address and basic profile
                            information so we can create and authenticate your
                            account. We do not request access to your Gmail,
                            contacts, or any other Google data.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>Resend</strong> —
                            transactional email provider used to deliver
                            account emails such as password resets. It receives
                            your email address and the contents of that message.
                            We do not send marketing email.
                        </li>
                    </ul>
                    <p>
                        Where the App detects a gap in your wardrobe, it may
                        offer a "Shop" link. Tapping it opens a Google Shopping
                        search in your browser for a generic garment description
                        such as "lightweight rain jacket." No account
                        information, closet data, or identifier is included in
                        that search, we receive nothing back from it, and we have
                        no affiliate relationship with any merchant shown.
                    </p>

                    {/* ── 6. Data Sharing and Disclosure ── */}
                    <h2>6. Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell, rent, or trade your personal
                        information. We may disclose your information only in
                        these limited circumstances:
                    </p>
                    <ul>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Service providers:
                            </strong>{' '}
                            Third-party vendors (MongoDB Atlas, Cloudflare R2,
                            Apple WeatherKit, Expo Push, Resend, and — if you
                            sign in with Apple or Google — Apple or Google)
                            acting on our behalf under their published privacy
                            and security terms.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Legal compliance:
                            </strong>{' '}
                            If required by law, court order, or governmental
                            authority.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>Safety:</strong>{' '}
                            To protect the rights, property, or safety of our
                            users or the public.
                        </li>
                        <li>
                            <strong style={{ color: 'white' }}>
                                Business transfer:
                            </strong>{' '}
                            If we merge with or are acquired by another company,
                            with advance notice to you.
                        </li>
                    </ul>

                    {/* ── 7. Data Retention ── */}
                    <h2>7. Data Retention</h2>
                    <p>
                        We retain your personal information for as long as your
                        account is active. Account data and wardrobe data are
                        kept until you delete your account. Individual outfit
                        wear-history entries are automatically deleted{' '}
                        <strong style={{ color: 'white' }}>
                            three years
                        </strong>{' '}
                        after the date they were recorded — this history is what
                        lets the App learn your preferences over multiple
                        seasons. You can clear your wear history at any time
                        from within the App without deleting your account.
                    </p>
                    <p>
                        When you delete your account, your profile, closets,
                        wear history, trips, and trip plans are erased
                        immediately, and any remaining copies are removed within{' '}
                        <strong style={{ color: 'white' }}>30 days</strong>.
                    </p>

                    {/* ── 8. Your Privacy Rights ── */}
                    <h2>8. Your Privacy Rights</h2>

                    <h3>8.1 All Users</h3>
                    <p>
                        You may access, correct, or delete your data at any time
                        within the App. To request a downloadable copy of your
                        data, contact us at{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                    </p>

                    <h3>8.2 California Residents (CCPA)</h3>
                    <p>
                        California residents have the right to know what
                        personal information we collect, request its deletion,
                        opt out of its sale (note: we do not sell data), and not
                        be discriminated against for exercising these rights.
                    </p>

                    {/* ── 9. Children's Privacy ── */}
                    <h2>9. Children's Privacy</h2>
                    <p>
                        The App is not intended for children under the age of 13
                        and complies with the Children's Online Privacy
                        Protection Act (COPPA). We do not knowingly collect
                        personal information from children under 13. If you
                        believe your child has provided us information, contact
                        us at{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
                        and we will delete it promptly.
                    </p>
                    <p>
                        Users aged 13–17 may use the App with parental
                        awareness.
                    </p>

                    {/* ── 10. Changes to This Privacy Policy ── */}
                    <h2>10. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time.
                        When we make material changes, we will update the
                        Effective Date and notify you via in-app notification or
                        email. Your continued use of the App after changes
                        constitutes acceptance.
                    </p>

                    {/* ── 11. Contact Us ── */}
                    <h2>11. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy,
                        contact us at{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                        We aim to respond within 30 calendar days.
                    </p>
                </div>
            </div>
        </div>
    );
}
