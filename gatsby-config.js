require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const siteUrl = process.env.URL || `https://vivhomeluxuries.com`

module.exports = {
  jsxRuntime: 'automatic',
  trailingSlash: 'never',
  siteMetadata: {
    siteTitle: 'Viv! Home Luxuries',
    siteTitleDefault: 'Viv! Home Luxuries',
    siteUrl: 'https://vivhomeluxuries.com',
    hrefLang: 'nl',
    siteDescription:
      'Duurzame kunstbloemen van het merk Viv! Home Luxuries. Hoge kwaliteit kunstbloemen bestellen, eenvoudig en snel in onze webshop. Verpakt als een echt cadeau! Bestel voor 16:00 en ontvang het morgen in huis. ',
    siteImage: '/default-og-image.jpg',
    twitterHandle: '@vivhomeluxuries',
    instagramHandle: 'vivhomeluxuries',
    facebookHandle: 'vivhomeluxuries',
    pinterestHandle: 'vivhomeluxuries',
  },
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Viv! Home Luxuries`,
        short_name: `Viv!`,
        start_url: `/`,
        background_color: `#FDFBF4`,
        theme_color: `#BC2F55`,
        display: `fullscreen`,
        icon: `src/images/manifest-logo.png`, // This path is relative to the root of the site.
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          '/fonts/*': [
            'Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable',
          ],
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-loadable-components-ssr',
   
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: `gatsby-source-shopify-translations`,
      options: {
        shopName: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyPassword: process.env.SHOPIFY_SHOP_PASSWORD,
        accessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
        defaultLang: 'nl',
        prefixDefault: false,
        configPath: require.resolve('./locales/config.json'),
        locales: ['nl', 'fr'],
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `avif`, `webp`, `png`],
          placeholder: `blurred`,
          quality: 75,
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: siteUrl,
        noQueryString: true,
        noTrailingSlash: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap',
        excludes: ['/admin', '/account'],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(
            filter: {
              path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
            }
          ) {
            nodes {
              path
            }
          }
        }
        `,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            changefreq: 'weekly',
            priority: 0.7,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.URL,
        sitemap: process.env.URL + '/sitemap/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/404', '/checkout', '/account', '/previews'],
          },
        ],
      },
    },

    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: [{ name: 'removeViewBox', active: false }],
                  },
                },
                'prefixIds',
              ],
            },
          },
        ],
        urlSvgOptions: [
          {
            test: /\.svg$/,
            svgoConfig: {
              plugins: [{ name: 'removeViewBox', active: false }],
            },
          },
        ],
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js'),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        printRejected: true,
        purgeCSSOptions: {
          safelist: [
            'navLink',
            'navLink:focus',
            'toastOuterWrapper',
            'toastWrapper',
            'hiding',
            'junip-product-summary-star',
            'react-multi-carousel-list',
            'react-multi-carousel-track',
            'react-multiple-carousel__arrow',
            'react-multiple-carousel__arrow:hover',
            'react-multiple-carousel__arrow::before',
            'react-multiple-carousel__arrow:disabled',
            'react-multiple-carousel__arrow--left',
            'react-multiple-carousel__arrow--left::before',
            'react-multiple-carousel__arrow--right',
            'react-multiple-carousel__arrow--right::before',
            'react-multi-carousel-dot-list',
            'react-multi-carousel-dot button',
            'react-multi-carousel-dot button:hover:active',
            'react-multi-carousel-dot--active button',
            'react-multi-carousel-item',
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          {
            domain: 'https://viv-home-luxuries.myshopify.com',
          },
        ],
      },
    },

    `gatsby-plugin-perf-budgets`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
  ].filter(Boolean),
}
