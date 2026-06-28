import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piccolo Bambino | Moda Infantil com Amor",
  description: "Roupas, acessórios e produtos para bebês e crianças. Qualidade e carinho em cada peça.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
