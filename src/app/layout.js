import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "SYM",
  description: "Documenting Productivity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mukta.className}>{children}</body>
    </html>
  );
}
