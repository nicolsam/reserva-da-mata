import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Reserva da Mata',
    default: 'Welcome | Reserva da Mata',
  },
  description:
    'Reserva da Mata is a reserve ecosystem focused on natural retreats and luxury chalets in Brazil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-blue-800 text-gray-200">

        <header>
          <Navigation />
        </header>

        <main>{children}</main>
        <footer>Copyright Reserva da Mata</footer>
      </body>
    </html>
  );
}
