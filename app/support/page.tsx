import type { Metadata } from "next";
import { ChevronDownIcon, MailIcon, CloudIcon, LockIcon, FolderIcon, CameraIcon, TrashIcon, ZapIcon, SuitcaseIcon, BellIcon, BarsIcon, MicIcon, SparkleIcon } from "@/components/icons";
import PageHeader from "@/components/PageHeader";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support",
  description: "Answers to common questions about OJO, plus how to reach us.",
};

const categories = [
  {
    icon: ZapIcon,
    label: "Getting Started",
    faqs: [
      {
        q: "How do outfit suggestions work?",
        a: "OJO reads your local weather forecast — including temperature, feels-like temperature, humidity, and wind — and cross-references it against the pieces in your active closet. It then scores each piece's suitability for the conditions and assembles a recommended outfit. On days with wide temperature swings, OJO's Layering Intelligence Engine also tells you which layers you can shed mid-day and when.",
      },
      {
        q: "Do I need to create an account?",
        a: "Yes, an account is required to save and sync your closets. You can sign up with email and password, or use Sign in with Apple or Google. Your closet data, outfit history, and preferences are stored in the cloud so they're available across devices and restored if you reinstall the app.",
      },
      {
        q: "Does OJO learn my style?",
        a: "Yes. Every time you log an outfit with \"Wore this today,\" OJO updates a private style profile — your signature colors, go-to fabrics, and favorite categories. The more you log, the more your recommendations shift toward what you actually like. After enough logged outfits the score badge even changes to \"Your Score\" to show suggestions are now personalized to you.",
      },
      {
        q: "Can I swap out a piece I don't like?",
        a: "Yes. Long-press any piece on the outfit card and OJO offers up to three stand-ins that still score well for today's weather. Pieces you swap away from teach OJO what you don't want, so future suggestions get closer to your taste.",
      },
      {
        q: "What is the Wear Calendar?",
        a: "Every time you tap \"Wore this today,\" the outfit is added to your Wear Calendar. It shows your current streak, a 26-week strip in the colors you wore, and month-by-month grids of outfit collages — tap any day to see what you wore. It replaces the old text-only history list.",
      },
    ],
  },
  {
    icon: CloudIcon,
    label: "Weather",
    faqs: [
      {
        q: "Why isn't weather loading?",
        a: "OJO fetches the forecast for the city you've set, so first make sure a city is entered under Settings → Location. If one is set and weather still won't load, try force-quitting the app and reopening it. If the issue persists, your device may have a network connectivity problem — try switching between Wi-Fi and cellular.",
      },
      {
        q: "The weather data seems wrong for my area.",
        a: "OJO uses Apple WeatherKit's real-time data, which is generally very accurate. First double-check that the city set in Settings → Location is correct, then refresh by pulling down on the main screen. If it still looks off, contact us and we'll investigate.",
      },
      {
        q: "Can I see a multi-day forecast?",
        a: "Yes — tap the weather section on the main screen to expand the full forecast view, which includes hourly and daily breakdowns.",
      },
    ],
  },
  {
    icon: FolderIcon,
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
        a: "OJO supports shirts, t-shirts, pants, jeans, shorts, jackets, coats, hoodies, sweaters, dresses, skirts, and shoes. When adding a piece, you can also specify fabric type (cotton, wool, synthetic, etc.) and color — both improve suggestion accuracy.",
      },
    ],
  },
  {
    icon: SuitcaseIcon,
    label: "TripFit & Trip Mode",
    faqs: [
      {
        q: "What is TripFit?",
        a: "TripFit is OJO's trip planner. Open it from the ✈️ button below your closet list, type a destination city, and pick your dates on the calendar (up to 10 days). OJO pulls the daily forecast for where you're headed and builds a day-by-day outfit plan plus a grouped packing list — tops, bottoms, outerwear, footwear, and accessories — drawn from your closet.",
      },
      {
        q: "How do I plan a trip?",
        a: "From the Closet tab, tap ✈️ TripFit, enter your destination and date range, and choose an occasion (Everyday, Work, Weekend, Date, Outdoor, or Athletic). OJO generates an outfit for each day — swipe between days, tap ↺ to re-plan any single day, and check items off as you pack. You can share the packing list as text from the share button.",
      },
      {
        q: "What is Trip Mode?",
        a: "Once you've arrived at your destination, Trip Mode keeps your plan live: it watches the local forecast and re-suggests outfits on the fly if the weather changes unexpectedly — so a surprise cold front or rain shower doesn't catch you off guard mid-trip.",
      },
    ],
  },
  {
    icon: BarsIcon,
    label: "Wardrobe Insights",
    faqs: [
      {
        q: "What does the Insights tab show?",
        a: "Insights turns your wardrobe data into a simple dashboard: the share of your closet you've actually worn recently, the cost-per-wear of each item (your best and worst value), your total wardrobe value, your most-worn pieces, and items that are \"sleeping\" — owned but rarely or never worn.",
      },
      {
        q: "How is cost-per-wear calculated?",
        a: "Cost-per-wear is the price you paid for an item divided by how many times you've worn it. Add a purchase price when you create or edit a piece and OJO does the rest — items without a price are simply left out of the cost-per-wear and wardrobe-value figures.",
      },
      {
        q: "What is the donation queue?",
        a: "When OJO flags an item as \"sleeping,\" you can add it to your donation queue with one tap. The queue is a private list on your device; when you mark an item donated, OJO removes it from your closet. Nothing is shared or posted anywhere.",
      },
    ],
  },
  {
    icon: BellIcon,
    label: "Notifications",
    faqs: [
      {
        q: "What notifications does OJO send?",
        a: "OJO can send a morning outfit brief with the day's recommendation, and alerts when the forecast for your city changes significantly. You choose which notifications to enable — OJO never sends marketing messages.",
      },
      {
        q: "Can notifications follow me when I travel?",
        a: "Yes, if you choose. By default your morning brief, widgets, and alerts describe wherever you last opened OJO. If you allow \"Always\" location access, OJO updates them for where you are — iOS wakes the app when you've moved roughly 5 miles (8 km), and OJO reads your location once, rounded to about 1 km, rather than tracking you continuously. You can turn this off any time by setting OJO's location access to \"While Using\" in your device Settings.",
      },
      {
        q: "How do I turn notifications on or off?",
        a: "Go to Settings → Notifications inside OJO to toggle the morning brief and weather alerts individually. You can also manage OJO's notification permission in your device's Settings → Notifications → OJO.",
      },
    ],
  },
  {
    icon: MicIcon,
    label: "Siri, Shortcuts & Widgets",
    faqs: [
      {
        q: "How do I ask Siri what to wear?",
        a: "Say \"What should I wear in Ojo\" or \"Ask Ojo what to wear\" to Siri, search for it in Spotlight, or add the action in the Shortcuts app. For tomorrow, say \"What should I wear tomorrow in Ojo.\" Siri speaks the answer and shows a card with photos of your pieces — the app doesn't open. It works on iOS 17 and later and is free for everyone.",
      },
      {
        q: "Siri says to open OJO instead of answering.",
        a: "Siri answers from the same snapshot your widgets use, so OJO needs to have refreshed at least once recently. Open OJO once to refresh it, then ask again. If your closet is empty, Siri gives the same weather advice you see on the Home screen.",
      },
      {
        q: "Which widgets does OJO have?",
        a: "Five: Today's Outfit, Tomorrow Prep, Layer Timeline, Trip Countdown, and UV & Sunset. Add them from your home screen or lock screen, and tap to change your fit without opening the app.",
      },
    ],
  },
  {
    icon: SparkleIcon,
    label: "Ojo Pro",
    faqs: [
      {
        q: "What does Ojo Pro include?",
        a: "Ojo Pro is an optional subscription that lifts the free limits on pieces and closets, lets you save more than one trip at a time in TripFit, and unlocks Style DNA — your named style profile with generative art and a shareable poster. Daily outfit suggestions and weather are always free.",
      },
      {
        q: "What happens if I'm over a free limit, or my subscription ends?",
        a: "Nothing is removed. An account over a limit keeps everything it already has, and it all keeps working — you just can't add more until you're back under the limit or subscribe again.",
      },
      {
        q: "How do I cancel or restore my subscription?",
        a: "Subscriptions are managed by Apple, so cancel in your device's Settings → [your name] → Subscriptions; we can't cancel or refund on your behalf. If you've already subscribed and Pro isn't showing, open the upgrade screen in OJO and tap Restore purchases.",
      },
    ],
  },
  {
    icon: CameraIcon,
    label: "Photos",
    faqs: [
      {
        q: "How do I upload clothing photos?",
        a: "When adding a piece, tap the image placeholder to open your photo library or take a new photo with your camera. OJO will need photo library and camera permissions for this — you can grant them in Settings → Privacy on your device.",
      },
      {
        q: "Are my photos stored securely?",
        a: "Yes. Your clothing photos are stored on Cloudflare R2 object storage and served over HTTPS, with filenames that contain no personal information. We do not use your photos for any purpose beyond displaying them in your closet. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    icon: LockIcon,
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
    icon: TrashIcon,
    label: "Account Deletion",
    faqs: [
      {
        q: "How do I delete my account?",
        a: "Visit our Delete Account page for step-by-step instructions, or email us directly from your registered email address with the subject line \"Delete My Account.\" We'll process your request within 30 days.",
      },
      {
        q: "What happens to my data when I delete my account?",
        a: "All your personal data — email, closets, clothing pieces, outfit history, photos, and preferences — is permanently deleted from our systems within 30 days of your confirmed deletion request. This action cannot be undone.",
      },
    ],
  },
];

// Native <details>: keyboard- and screen-reader-accessible disclosure with no
// client JavaScript, so this whole page renders on the server.
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-white/10 last:border-0">
      <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer w-full flex items-start justify-between gap-4 py-4 min-h-[44px] text-left">
        <span className="text-ink-primary font-medium text-sm leading-relaxed">
          {q}
        </span>
        <ChevronDownIcon
          size={16}
          className="text-ink-muted flex-shrink-0 mt-0.5 transition-transform duration-ojo group-open:rotate-180"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </summary>
      <p className="text-ink-secondary text-sm leading-relaxed pb-4">{a}</p>
    </details>
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
            <div key={cat.label} className="glass rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 glass-strong rounded-sm flex items-center justify-center">
                  <Icon size={15} className="text-ink-primary" strokeWidth={1.8} />
                </div>
                <h2 className="font-outfit font-semibold text-ink-primary">{cat.label}</h2>
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
        <div className="glass-strong rounded-lg p-7 text-center">
          <div className="w-11 h-11 glass rounded-md flex items-center justify-center mx-auto mb-4">
            <MailIcon size={18} className="text-ink-primary" strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-ink-primary text-xl mb-2">
            Still need help?
          </h2>
          <p className="text-ink-primary text-sm leading-relaxed mb-5 max-w-sm mx-auto">
            Send us a message and we'll get back to you within 24–48 hours on
            business days. Include your device model and iOS version for faster
            support.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=OJO%20Support%20Request`}
            className="inline-flex items-center gap-2 btn-primary font-outfit font-semibold text-sm px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-ojo"
          >
            <MailIcon size={14} />
            {SUPPORT_EMAIL}
          </a>
          <p className="text-ink-muted text-xs mt-4">
            Response time: 24–48 business hours
          </p>
        </div>

      </div>
    </div>
  );
}
