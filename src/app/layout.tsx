import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Das Contratações Públicas",
  description: "Explore e acompanhe contratações públicas de forma eficiente e transparente no Portal Nacional de Contratações Públicas (PNCP). Acesse informações detalhadas sobre processos de compras, órgãos responsáveis, modalidades de contratação e muito mais, tudo em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
        <body className={inter.className}>{children}</body>
    </html>
  );
}
