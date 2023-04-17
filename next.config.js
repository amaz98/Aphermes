/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@ionic/react",
  "@ionic/core",
  "ionicons",
  "@stencil/core",
]);

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/aphermes",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['assets.coingecko.com'],
  },
 
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
