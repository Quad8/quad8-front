/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quad8-nextjs-static.s3.amazonaws.com',
        port: '',
        pathname: '/src/app/**',
      },
      {
        protocol: 'https',
        hostname: 'quad8-nextjs-static.s3.amazonaws.com',
        port: '',
        pathname: '/src/component/**',
      },
      {
        protocol: 'https',
        hostname: 'd1wt2ljvmyxns0.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "src/styles/_globals.scss";`,
  },
};

export default nextConfig;
