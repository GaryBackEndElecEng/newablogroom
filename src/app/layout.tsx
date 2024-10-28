import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import EditorContextProvider from "@/components/context/editorContext";
import Footer from "@/components/footer/Footer";
import Header from "@/components/nav/Header";
import Providers from "./providers";
const bend = "/images/main.png";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = process.env.NODE_ENV !== "production" ? process.env.NEXTAUTH_URL as string : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-CA': '/fr-CA',
    },
  },
  title: {
    default: "ablogroom",
    template: `%s | ablogroom`,

  },
  verification: {
    google: 'S88O7lTinqgyYLB8h1x2fOusiDQY9V68xuDpUZevLQY',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      name: ['masterconnect919@gmail.com', 'https://www.masterconnect.ca/contact'],
    },
  },
  category: "blog",
  description: 'Generated by www.masterconnect.ca,Free Blog Creation for you. It provides templates that the user can use to become an effective blogger. The Blog Room has all the effective tools for the blogger to fine-tune their skills in blogging.',
  generator: "Next.js",
  applicationName: "ablogroom",
  referrer: "origin-when-cross-origin",
  keywords: ["The Blog Room, Free to use", "blogs for you", "web info", "free blog posts", " The World is Your Oyster", " Create Your Own Blog", "Gary's Blogs"],
  authors: [{ name: "Gary Wallace", url: "https://www.masterconnect.ca" }],
  // colorScheme:"light",
  creator: "Gary Wallace",
  publisher: "Gary Wallace",
  formatDetection: {
    email: true,
    address: false,
    telephone: true
  },
  openGraph: {
    title: "ablogroom",
    description: 'Generated by www.masterconnect.ca,tools for you',
    url: baseUrl,
    siteName: "ablogroom",
    images: [
      {
        url: "/images/gb_logo_600.png",
        width: 600,
        height: 600
      },
      {
        url: "/images/gb_logo_800_400.png",
        width: 800,
        height: 400
      },
    ],
    locale: "en-CA",
    type: "website"

  },
  robots: {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
  },
  appleWebApp: {
    title: 'A Blog room',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1025.png',
      {
        url: '/images/gb_logo768x1025.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
};

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
          {/* <EditorContextProvider> */}
          {/* <Header /> */}
          {children}
          <Footer />
          {/* </EditorContextProvider> */}
        </Providers>

      </body>
    </html>
  );
}
