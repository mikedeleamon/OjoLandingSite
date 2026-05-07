import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "OJO — Dress for the weather.",
    template: "%s | OJO",
  },
  description:
    "OJO is your weather-aware outfit companion. It reads the forecast, knows your wardrobe, and tells you exactly what to wear — every single day.",
  keywords: [
    "outfit planner",
    "weather app",
    "closet management",
    "what to wear",
    "outfit suggestions",
    "wardrobe app",
  ],
  authors: [{ name: "OJO App" }],
  creator: "OJO App",
  metadataBase: new URL("https://ojo-app.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ojo-app.com",
    title: "OJO — Dress for the weather.",
    description:
      "Your weather-aware outfit companion. Smart outfit suggestions powered by your local forecast.",
    siteName: "OJO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OJO App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OJO — Dress for the weather.",
    description:
      "Your weather-aware outfit companion. Smart outfit suggestions powered by your local forecast.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen relative overflow-x-hidden">
        {/* Animated background blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 animate-float"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-20 animate-float-slow"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 animate-float"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              animationDelay: "3s",
            }}
          />
        </div>

        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
