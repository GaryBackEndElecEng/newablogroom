import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditorContextProvider from "@/components/context/editorContext";
import Footer from "@/components/footer/Footer";
import Header from "@/components/nav/Header";
import Providers from "./providers";
const bend = "/images/main.png";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = process.env.NODE_ENV !== "production" ? process.env.NEXTAUTH_URL as string : "https://www.ablogroom.com";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ablogroom.com"),
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
  manifest: "./manifest.json",
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
    url: "https://www.ablogroom.com",
    siteName: "ablogroom",
    images: [
      {
        url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/gb_logo_600.png",
        width: 600,
        height: 600
      },
      {
        url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/gb_logo_800_400.png",
        width: 800,
        height: 400
      },
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
      {
        url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/thankYou.png",
        width: 600,
        height: 900
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
  // appleWebApp: {
  //   title: 'A Blog room',
  //   statusBarStyle: 'black-translucent',
  //   startupImage: [
  //     '/assets/startup/apple-touch-startup-image-768x1025.png',
  //     {
  //       url: '/images/gb_logo768x1025.png',
  //       media: '(device-width: 768px) and (device-height: 1024px)',
  //     },
  //   ],
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //className={inter.className}

  return (
    <html lang="en">
      <body >
        <Providers>
          <EditorContextProvider>
            <Header />
            {children}
            <Footer />
          </EditorContextProvider>
        </Providers>

      </body>
    </html>
  );
}
