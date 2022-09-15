const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const ContentSecurityPolicy = `
  default-src 'self' *.${process.env.NEXT_PUBLIC_OWN_DOMAIN};
  script-src 'self' *.${process.env.NEXT_PUBLIC_OWN_DOMAIN} ;
  style-src 'self' *.${process.env.NEXT_PUBLIC_OWN_DOMAIN} unsafe-inline;
  font-src 'self' *.${process.env.NEXT_PUBLIC_OWN_DOMAIN};
    
`
const securityHeaders = [{
  key: 'X-DNS-Prefetch-Control',
  value: 'on'
},
{
  key: 'Strict-Transport-Security',
  value: 'max-age=3600; includeSubDomains; preload'
},
{
  key: 'X-XSS-Protection',
  value: '1; mode=block'
},
{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
},

{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
},
{
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
}
]

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_RAZORPAY_KEY: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    NEXT_PUBLIC_SHOP_NAME: process.env.NEXT_PUBLIC_SHOP_NAME,
    NEXT_PUBLIC_SHOP_DESCRIPTION: process.env.NEXT_PUBLIC_SHOP_DESCRIPTION,
    NEXT_PUBLIC_CUSTOMER_CARE: process.env.NEXT_PUBLIC_CUSTOMER_CARE,
    NEXT_PUBLIC_FEATURED_PRODUCTS:"Shirt",
    NEXT_PUBLIC_SEARCH_APP_ID:process.env.NEXT_PUBLIC_SEARCH_APP_ID,
    NEXT_PUBLIC_SEARCH_API_KEY:process.env.NEXT_PUBLIC_SEARCH_API_KEY,
  },
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost",process.env.NEXT_PUBLIC_CDN_DOMAIN??""],
  },
  rewrites: async () => {
    return [
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
})
console.log(process.env)
console.log("next.config.js", JSON.stringify(module.exports, null, 2))
