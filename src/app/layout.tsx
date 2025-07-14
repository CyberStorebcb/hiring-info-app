import React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  description: "Processo de validação de tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Fundo animado */}
        <div className="bg-animated" />
        {/* Conteúdo centralizado */}
        <div className="main-content">
          {/* Cabeçalho (opcional) */}
          {/* <header className="header">Seu Logo ou Título</header> */}
          {children}
          {/* Rodapé (opcional) */}
          {/* <footer className="footer">© {new Date().getFullYear()} Sua Empresa</footer> */}
        </div>
      </body>
    </html>
  );
}