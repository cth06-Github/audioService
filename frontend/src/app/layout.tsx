import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import LoadingPage from "./(components)/loading-page";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      </body>
    </html>
  );
}
