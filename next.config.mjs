/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_KEYDEUK_API_BASE_URL: process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL,
  },

  env: {
    NEXT_PUBLIC_KEYDEUK_API_BASE_URL: process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL,
  },

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
      {
        protocol: 'https',
        hostname: 'shop-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.imweb.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shop-phinf.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-optimized.imweb.me',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'img.danawa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.011st.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static2.e-himart.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'gdimg.gmarket.co.kr',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'tbnws.hgodo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'contents.lotteon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'keyduek-image-file.s3.ap-northeast-2.amazonaws.com',
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
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
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

  transpilePackages: ['three'],
};

export default nextConfig;
