import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "АО АК Беркут",
    description: "Лидер в области конструирования и создания сверхлёгких летательных аппаратов вертолётного типа.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <head>
            {/* Favicon (иконка сайта) */}
            <link rel="icon" type="image/png" href="/logo.png" sizes="any" />
            {/* Если используешь SVG: */}
            {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
            {/* Можно добавить Apple Touch Icon: */}
            {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
        </body>
        </html>
    );
}