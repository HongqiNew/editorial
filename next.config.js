const withPWA = require('next-pwa')({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/profile_images/**',
      },
      {
        protocol: 'https',
        hostname: 'static.newhongqi.org',
      },
      {
        protocol: 'https',
        hostname: 'bbvsukzcbmlmapdkuybx.supabase.co',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
