import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Cutlink - URL shortner",
  description: "Shorten your links with Cutlink",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-green-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
