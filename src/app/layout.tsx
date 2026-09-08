import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fixar Service | Professional Appliance Repair & Maintenance (UAE)",
  description:
    "Expert home appliance repair and maintenance in Sharjah, Dubai, and UAE. AC repair, refrigerator servicing, washing machine, oven, water heater. Fast 24/7 doorstep service.",
  metadataBase: new URL("https://www.fixar.in"),
  keywords: [
    "appliance repair Sharjah",
    "AC repair Sharjah",
    "refrigerator repair Dubai",
    "washing machine repair UAE",
    "home appliance service Middle East",
    "Fixar service",
  ],
  openGraph: {
    title: "Fixar Service | Professional Appliance Repair & Maintenance",
    description:
      "Reliable, doorstep home appliance repair in Sharjah, Dubai, and across UAE. 24/7 support, genuine spare parts, certified technicians.",
    siteName: "Fixar Service",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyBar />
          <FloatingWhatsApp />
        </LocaleProvider>
      </body>
    </html>
  );
}
