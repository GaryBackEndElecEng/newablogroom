/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "tsx", "ts", "md"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  typescript: {
    ignoreBuildErrors: true,
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
              "newmasterconnect.herokuapp.com,www.masterconnect.ca,ww.master-connect.ca,compute-1.amazonaws.com,master-sale.herokuapp.com, www.masterconnect.ca,www.masterultils.com,masterultils-postimages.s3.us-east-1.amazonaws.com,localhost:3000,www.masterultils.com,main.d2qer3lk2obzqm.amplifyapp.com,newablogroom-free-bucket.s3.us-east-1.amazonaws.com,rcjl935e52.execute-api.ca-central-1.amazonaws.com",
          },
        ],
      },
      {
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
              "newmasterconnect.herokuapp.com,www.masterconnect.ca,ww.master-connect.ca,compute-1.amazonaws.com,master-sale.herokuapp.com, www.masterconnect.ca,www.masterultils.com,masterultils-postimages.s3.us-east-1.amazonaws.com,localhost:3000,main.d2qer3lk2obzqm.amplifyapp.com,newmasterconnect.herokuapp.com,new-master.s3.ca-central-1.amazonaws.com,newablogroom-free-bucket.s3.us-east-1.amazonaws.com",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "new-master.s3.ca-central-1.amazonaws.com",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "newablogroom-free-bucket.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "http",
        hostname: "localhost:3000",
        port: "",
        pathname: "./images/**",
      },
      {
        protocol: "https",
        hostname: "www.ablogroom.com",
        port: "",
        pathname: "./images/**",
      },
      {
        protocol: "https",
        hostname: "ablogroom.com",
        port: "",
        pathname: "./images/**",
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
        // pathname: "/**",
      },
    ],
    domains: [
      "new-master.s3.ca-central-1.amazonaws.com",
      "garyposttestupload.s3.us-east-1.amazonaws.com",
      "masterultils-postimages.s3.us-east-1.amazonaws.com",
      "new-master.s3.ca-central-1.amazonaws.com",
      "newmasterconnect.herokuapp.com",
      "main.d2qer3lk2obzqm.amplifyapp.com",
      "newablogroom-free-bucket.s3.us-east-1.amazonaws.com",
    ],
  },
  env: {
    DATABASE_URL_AWS: process.env.DATABASE_URL_AWS,
    BUCKET_NAME: process.env.BUCKET_NAME,
    BUCKET_REGION: process.env.BUCKET_REGION,
    SDK_ACCESS_KEY: process.env.SDK_ACCESS_KEY,
    SDK_ACCESS_SECRET: process.env.SDK_ACCESS_SECRET,
    CSRF_SECRET: process.env.CSRF_SECRET,
    NEXTAUTH_CSRF: process.env.NEXTAUTH_CSRF,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    EMAIL: process.env.EMAIL,
    EMAIL2: process.env.EMAIL2,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    ROOTURL: process.env.ROOTURL,
    EMAIL_PASS: process.env.EMAIL_PASS,
    GOOGLE_client_ID: process.env.GOOGLE_client_ID,
    GOOGLE_client_secret: process.env.GOOGLE_client_secret,
    SDK_ACCESS_KEY_FREE_BUCKET: process.env.SDK_ACCESS_KEY_FREE_BUCKET,
    SDK_ACCESS_KEY_SECRET_FREE_BUCKET:
      process.env.SDK_ACCESS_KEY_SECRET_FREE_BUCKET,
    FREE_BUCKET_NAME: process.env.FREE_BUCKET_NAME,
  },
};

export default nextConfig;
