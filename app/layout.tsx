import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva da Mata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-blue-800">

        <header>
          <Navigation />
        </header>

        <main>{children}</main>
        <footer>Copyright Reserva da Mata</footer>
      </body>
    </html>
  );
}
