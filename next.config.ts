import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  // Varias fotos (ya comprimidas en el navegador) en un solo guardado; Vercel corta en 4.5 MB.
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qmdxmvswtqpvushfogjn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withBotId(nextConfig);
