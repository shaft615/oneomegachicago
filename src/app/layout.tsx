import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: {
    default: "One Omega Foundation",
    template: "%s · One Omega Foundation",
  },
  description:
    "One Omega Foundation, Inc. — coordinating entity for 13 Chicagoland chapters of Omega Psi Phi Fraternity, Inc., and host of the 86th Grand Conclave (Chicago Conclave 2028).",
  metadataBase: new URL("https://oneomegachicago.org"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-neutral-800 min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <DonateButton />
      </body>
    </html>
  );
}
