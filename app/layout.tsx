import Link from "next/link";
import "./globals.css";
import { Archivo } from "next/font/google";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Made by Alfie Rayner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.className}>
      
      {children}
        
    </html>
  );
}
