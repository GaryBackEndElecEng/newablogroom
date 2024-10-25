import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditorContextProvider from "@/components/context/editorContext";
import Footer from "@/components/footer/Footer";
import Meta from "@/components/meta/meta";
import Providers from "./providers";
const bend = "/images/main.png";

const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/nav/Header";
const baseUrl = process.env.NODE_ENV !== "production" ? process.env.NEXTAUTH_URL as string : "http://localhost:3000";
export const metadata: Metadata = Meta.metaHome({ baseUrl });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const style: { [key: string]: string } = { minHeight: "90vh", backgroundColor: "white", marginInline: "auto", backgroundImage: `url(${bend})`, backgroundSize: "100% 100%", backgroundPosition: "50% 50%" }
  return (
    <html lang="en">
      <body className={inter.className} style={style}>
        <Providers>
          <EditorContextProvider>
            {children}
            {/* <Footer /> */}
          </EditorContextProvider>
        </Providers>

      </body>
    </html>
  );
}
