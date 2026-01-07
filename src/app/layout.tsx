import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaulted | Proposal Intelligence",
  description: "Turn your winning proposals into an AI-powered knowledge vault. Draft RFP responses 10x faster with source citations and confidence scores. Enterprise-grade security.",
  keywords: ["RFP automation", "proposal intelligence", "bid management", "tender response", "AI writing", "knowledge management", "enterprise AI"],
  authors: [{ name: "Vaulted" }],
  openGraph: {
    title: "Vaulted | Proposal Intelligence",
    description: "Turn past wins into future revenue. AI-powered RFP drafting with citations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
