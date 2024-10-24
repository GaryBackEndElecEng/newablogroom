/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "mdx", "tsx", "ts", "md"],
  experimental: {
    // serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "false",
          },
          {
            key: "Content-Type",
            value:
              "multipart/form-data,application/json,application/x-www-form-urlencoded", // Matched parameters can be used in the value
          },
          {
            key: "Cach-Control",
            value: "public,max-age=14400,stale-while-revalidate=7200", // Matched parameters can be used in the value
          },

          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,XSRF-TOKEN,Access-Control-Allow-Origin,csrfToken",
          },
          {
            key: "Access-Control-Allow-Origin",
            value:
              "newmasterconnect.herokuapp.com,www.masterconnect.ca,ww.master-connect.ca,compute-1.amazonaws.com,master-sale.herokuapp.com, www.masterconnect.ca,www.masterultils.com,masterultils-postimages.s3.us-east-1.amazonaws.com,localhost:3000,www.masterultils.com",
          },
        ],
        source: "/:path*",
        headers: [
          {
            key: "crossOrigin",
            value: "anonymous",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token,next-auth.csrf-token, X-Requested-With,access-token, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,XSRF-TOKEN,Access-Control-Allow-Origin",
          },
          {
            key: "Access-Control-Allow-Origin",
            value:
              "newmasterconnect.herokuapp.com,www.masterconnect.ca,ww.master-connect.ca,compute-1.amazonaws.com,master-sale.herokuapp.com, www.masterconnect.ca,www.masterultils.com,masterultils-postimages.s3.us-east-1.amazonaws.com,localhost:3000,main.d1qeikuwg9b9l6.amplifyapp.com/,newmasterconnect.herokuapp.com",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "new-master.s3.ca-central-1.amazonaws.com",
        port: "",
        // pathname: '/account123/**',
      },

      {
        protocol: "http",
        hostname: "localhost:3000",
        port: "",
        pathname: "./images/**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
        port: "",
        pathname: "./images/display/**",
      },
      {
        protocol: "https",
        hostname: "ablogroom.com",
        port: "",
        pathname: "./images/**",
      },
      {
        protocol: "https",
        hostname: "ablogroom.com",
        port: "",
        pathname: "./images/display/**",
      },
      {
        protocol: "https",
        hostname: "masterultils.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "aws.amazon.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "masterultils-postimages.s3.us-east-1.amazonaws.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "garyposttestupload.s3.us-east-1.amazonaws.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "newmasterconnect.herokuapp.com",
        port: "",
        pathname: "/api/**",
      },
    ],
    domains: [
      "new-master.s3.ca-central-1.amazonaws.com",
      "garyposttestupload.s3.us-east-1.amazonaws.com",
      "masterultils-postimages.s3.us-east-1.amazonaws.com",
      "new-master.s3.ca-central-1.amazonaws.com",
      "newmasterconnect.herokuapp.com",
    ],
  },
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === "production"
        ? process.env.NEXTAUTH_URL
        : "http://localhost:3000",
    DATABASE_URL_AWS: process.env.DATABASE_URL_AWS,
    NEXTAUTH_CSRF: process.env.NEXTAUTH_CSRF,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASEURL: process.env.DATABASEURL,
    GOOGLE_client_secret: process.env.GOOGLE_client_secret,
    GOOGLE_client_ID: process.env.GOOGLE_client_ID,
    EMAIL2: process.env.EMAIL2,
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    CSRF_SECRET: process.env.CSRF_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BUCKET_NAME: process.env.BUCKET_NAME,
    BUCKET_REGION: process.env.BUCKET_REGION,
    SDK_ACCESS_KEY: process.env.SDK_ACCESS_KEY,
    SDK_ACCESS_SECRET: process.env.SDK_ACCESS_SECRET,
  },
};

export default nextConfig;
