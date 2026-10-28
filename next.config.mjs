/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Conclave hub page was retired; the Conclave has its own website.
  // Keep old inbound links working by sending them to the home page.
  async redirects() {
    return [{ source: "/conclave-2028", destination: "/", permanent: false }];
  },
  images: {
    // Portal-managed event flyers are served from the governance portal's
    // Supabase Storage (public event-flyers bucket) as absolute URLs — see
    // src/lib/portal-events.ts. Static events keep site-relative paths.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/event-flyers/**",
      },
    ],
  },
};

export default nextConfig;
