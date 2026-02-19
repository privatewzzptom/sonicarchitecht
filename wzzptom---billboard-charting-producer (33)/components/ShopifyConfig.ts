/**
 * YOUR SHOPIFY STORE CREDENTIALS
 * IMPORTANT: Set these as Environment Variables in Vercel/Dashboard or .env local.
 * Do not commit real tokens to Git.
 */
interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
  adminAccessToken: string;
  apiVersion: string;
}

export const SHOPIFY_CONFIG: ShopifyConfig = {
  domain: process.env.SHOPIFY_DOMAIN || 'wzzptom-production.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN || '8c5f5d9f363c981407d31a19ca37954b',
  adminAccessToken: process.env.SHOPIFY_ADMIN_TOKEN || 'dummy-admin-token',
  apiVersion: process.env.SHOPIFY_API_VERSION || '2024-01'
};