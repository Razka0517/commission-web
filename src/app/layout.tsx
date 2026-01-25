import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";


const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});


const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Reinakocchi - Commission Info",
  description: "Anime & Character Illustration Commission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white text-[#2A2242]`}>
        {children}
      </body>
    </html>
  );
}