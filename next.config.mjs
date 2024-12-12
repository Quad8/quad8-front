/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
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
    fileLoaderRule.exclude = /\.svg$/i;
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]',
      },
    });
    return config;
  },
  sassOptions: {
    includePaths: ['styles'],
    additionalData: `@import "src/styles/_globals.scss";`,
  },
  transpilePackages: ['three'],

  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*MJ12bot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Amazonbot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*ClaudeBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*DotBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Linkbot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Iframely.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*AhrefsBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*PetalBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*BLEXBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*woorankreview.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Barkrowler.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*Neevabot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*SeoSiteCheckup.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*SemrushBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*RSiteAuditor.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*YandexBot.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*GrapeshotCrawler.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'User-Agent',
            value: '(.*proximic.*)',
          },
        ],
        destination: '/401',
        permanent: false,
      },
      {
        source: '/wordpress',
        destination: '/401',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/401',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
