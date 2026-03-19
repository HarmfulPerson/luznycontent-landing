import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luzny Content | UGC Content Creator",
  description: "Tworzę autentyczny, estetyczny content, który sprzedaje. UGC, video, foto — Julia Jabłońska.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&family=Bodoni+Moda:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
