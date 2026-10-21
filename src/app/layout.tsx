import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { LabProvider } from "@/lib/lab-context";
import { GlobalUI } from "@/components/app-shell";
import "./tokens.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "EasyQR — Product UI Lab",
  description:
    "EasyQRService Product UI V2. An isolated Quiet Utility visual prototype.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <LabProvider>
          {children}
          <GlobalUI />
        </LabProvider>
      </body>
    </html>
  );
}
