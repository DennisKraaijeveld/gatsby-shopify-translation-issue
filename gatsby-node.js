// const path = require('path')
// const productPerPage = 24

// const union = require('lodash.union')
// const kebabCase = require('lodash.kebabcase')

// const { localizedSlug } = require('./src/utils/gatsby-node-helpers')
// const { createRemoteFileNode } = require('gatsby-source-filesystem')

// // Define the number of pages for each Shopify collection.
// const numberOfPages = (productCount, productsPerPage) => {
//   return productCount < productsPerPage
//     ? 1
//     : Math.floor(productCount / productsPerPage) + 1
// }
// // Set up filters for Shopify Collection pages.
// const filters = {
//   colors: [],
//   flowerTypes: [],
//   vendors: [],
// }

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage, createRedirect } = actions
//   const postsPerPage = 6
//   const categories = []

//   const blogLayout = path.resolve(`src/templates/Blog/BlogPost.jsx`)
//   const blogListLayout = path.resolve(`./src/templates/Blog/index.jsx`)
//   const blogCategoryLayout = path.resolve(`src/templates/Blog/Category.jsx`)
//   const productPageLayout = path.resolve(`./src/templates/Product/index.jsx`)
//   const collectionPageLayout = path.resolve(
//     `./src/templates/Collection/index.jsx`
//   )

//   // const products = await graphql(`
//   //   {
//   //     allShopifyProduct {
//   //       edges {
//   //         node {
//   //           id
//   //           handle
//   //           productType
//   //           tags
//   //           vendor
//   //         }
//   //       }
//   //     }
//   //   }
//   // `)

//   // products.data.allShopifyProduct.edges.forEach(({ node }) => {
//   //   let colorTags = node.tags?.filter((tag) => tag.startsWith('color:'))
//   //   let flowerTypeTags = node.tags?.filter((tag) =>
//   //     tag.startsWith('flower_type:')
//   //   )
//   //   let vendorNames = []
//   //   if (node.vendor) {
//   //     vendorNames.push(node.vendor)
//   //   }

//   //   filters.vendors = union(filters.vendors, vendorNames)
//   //   filters.colors = union(filters.colors, colorTags)
//   //   filters.flowerTypes = union(filters.flowerTypes, flowerTypeTags)
//   //   createPage({
//   //     path: `/products/${node.handle}`,
//   //     component: productPageLayout,
//   //     context: {
//   //       id: node.id,
//   //       handle: `/${node.handle}`,
//   //       productType: node.productType,
//   //       collections: node.collections,
//   //       availableForSale: node.totalInventory > 0,
//   //     },
//   //   })
//   // })

//   // const collections = await graphql(`
//   //   {
//   //     allShopifyCollection {
//   //       edges {
//   //         node {
//   //           title
//   //           description
//   //           handle
//   //           productsCount
//   //           products {
//   //             handle
//   //             id
//   //             title
//   //             productType
//   //             shopifyId
//   //             variants {
//   //               id
//   //               storefrontId
//   //               productId
//   //               compareAtPrice
//   //               sku
//   //               selectedOptions {
//   //                 name
//   //                 value
//   //               }
//   //               price
//   //               title
//   //               displayName
//   //               availableForSale
//   //               product {
//   //                 storefrontId
//   //               }
//   //             }
//   //             tags
//   //             totalInventory
//   //             images {
//   //               id
//   //               altText
//   //               gatsbyImageData(aspectRatio: 1, width: 500)
//   //             }
//   //             priceRangeV2 {
//   //               minVariantPrice {
//   //                 amount
//   //                 currencyCode
//   //               }
//   //             }
//   //             vendor
//   //           }
//   //         }
//   //       }
//   //     }
//   //   }
//   // `)

//   // collections.data.allShopifyCollection.edges.forEach(({ node }) => {
//   //   let numPages = numberOfPages(node.productsCount, 24)
//   //   console.log('starting collection pages', numPages)
//   //   for (i = 0; i < numPages; i++) {
//   //     let productStart = i * productPerPage
//   //     let productEnd = productStart + 24
//   //     let products = node.products.slice(productStart, productEnd)
//   //     createPage({
//   //       path: i === 0 ? `/${node.handle}` : `/${node.handle}/${i + 1}`,
//   //       component: collectionPageLayout,
//   //       context: {
//   //         handle: node.handle,
//   //         products: products,
//   //         numPages: numPages,
//   //         currentPage: i + 1,
//   //         basePath: `/${node.handle}`,
//   //         tagFilters: filters,
//   //       },
//   //     })
//   //   }

//   //   createRedirect({
//   //     fromPath: `/collections/${node.handle}/`,
//   //     toPath: `/${node.handle}`,
//   //     isPermanent: true,
//   //   })
//   // })

//   const legalPages = await graphql(`
//     {
//       allPrismicPageLegal {
//         edges {
//           node {
//             lang
//             uid
//           }
//         }
//       }
//     }
//   `)

//   legalPages.data.allPrismicPageLegal.edges.forEach(({ node }) => {
//     createPage({
//       path: localizedSlug(node),
//       component: require.resolve(`./src/templates/Page/Legal.jsx`),
//       context: {
//         uid: node.uid,
//         lang: node.lang,
//       },
//     })
//   })

//   const contentPages = await graphql(`
//     {
//       allPrismicPageContent {
//         edges {
//           node {
//             lang
//             uid
//           }
//         }
//       }
//     }
//   `)

//   contentPages.data.allPrismicPageContent.edges.forEach(({ node }) => {
//     createPage({
//       path: localizedSlug(node),
//       component: require.resolve(`./src/templates/Page/Content.jsx`),
//       context: {
//         uid: node.uid,
//         lang: node.lang,
//       },
//     })
//   })

//   /* Create blog posts */
//   const posts = await graphql(`
//     {
//       allPrismicBlogPost {
//         nodes {
//           id
//           uid
//           lang
//           type
//           url
//           data {
//             blog_category {
//               uid
//             }
//           }
//         }
//       }
//     }
//   `)

//   posts.data.allPrismicBlogPost.nodes.forEach((post, index, arr) => {
//     categories.push(post.data.blog_category.uid)

//     const prev = arr[index - 1]
//     const next = arr[index + 1]

//     createPage({
//       path: `${post.url}`,
//       component: blogLayout,
//       context: {
//         ...post,
//         category: post.data.blog_category.uid,
//         prev: prev,
//         next: next,
//       },
//     })
//   })

//   const countCategories = categories.reduce((prev, curr) => {
//     prev[curr] = (prev[curr] || 0) + 1
//     return prev
//   }, {})
//   const allCategories = Object.keys(countCategories)

//   allCategories.forEach((cat, i) => {
//     const link = `/blog/${kebabCase(cat)}`
//     Array.from({
//       length: Math.ceil(countCategories[cat] / postsPerPage),
//     }).forEach((_, i) => {
//       createPage({
//         path: i === 0 ? link : `${link}/${i + 1}`,
//         component: blogCategoryLayout,
//         context: {
//           allCategories: allCategories,
//           category: cat,
//           limit: postsPerPage,
//           skip: i * postsPerPage,
//           currentPage: i + 1,
//           numPages: Math.ceil(countCategories[cat] / postsPerPage),
//         },
//       })
//     })
//   })

//   const allBlogPosts = await graphql(`
//     {
//       allPrismicBlogPost(sort: { fields: data___publish_date, order: DESC }) {
//         nodes {
//           id
//           uid
//           lang
//           type
//           url
//         }
//       }
//     }
//   `)

//   const numBlogListPages = Math.ceil(
//     allBlogPosts.data.allPrismicBlogPost.nodes.length / postsPerPage
//   )

//   Array.from({ length: numBlogListPages }).forEach((_, i) => {
//     createPage({
//       path: i === 0 ? `/blog` : `/blog/${i + 1}`,
//       component: blogListLayout,
//       context: {
//         allCategories: allCategories,
//         limit: postsPerPage,
//         skip: i * postsPerPage,
//         pageCount: numBlogListPages,
//         currentPage: i + 1,
//       },
//     })
//   })
// }
// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/account/)) {
//     page.matchPath = `/account/*`

//     // Update the page.
//     createPage(page)
//   }
// }

// // Add a "fields.localImages" field to Shopify Product integration fields. It
// // contains a list of File nodes that lets `gatsby-transformer-sharp` process
// // the images.
// exports.onCreateNode = async ({
//   node,
//   actions: { createNode, createNodeField },
//   createNodeId,
//   reporter,
//   getCache,
//   store,
// }) => {
//   // Look for Shopify Product integration nodes.
//   if (
//     node.internal.type ===
//     'PrismicHomepageDataBodySmallProductGridItemsProductgridMax3IntegrationType'
//   ) {
//     const images = node.images

//     // For each image, use createRemoteFileNode to download the image and save
//     // in a new node.
//     const imageNodes = await Promise.all(
//       images.map(async (image) => {
//         if (image.src) {
//           return createRemoteFileNode({
//             url: image.src,
//             parentNodeId: node.id,
//             createNode,
//             createNodeId,
//             reporter,
//             getCache,
//             store,
//           })
//         }
//       })
//     )

//     // We will reference each downloaded image node by ID.
//     const imageNodeIds = imageNodes.map((node) => node.id)

//     // Add a field called "fields.localImages" to the Shopify Product
//     // integration node.
//     createNodeField({
//       node,
//       name: 'localImages',
//       value: imageNodeIds,
//     })
//   }
// }

// // Tell Gatsby that `fields.localImages` is a list of File nodes.
// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const shopifyProductType = schema.buildObjectType({
//     name: 'PrismicHomepageDataBodySmallProductGridItemsProductgridMax3IntegrationTypeFields',
//     fields: {
//       localImages: {
//         type: '[File]',
//         extensions: { link: {} },
//       },
//     },
//   })

//   actions.createTypes(shopifyProductType)
// }
