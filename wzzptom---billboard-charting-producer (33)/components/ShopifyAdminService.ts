import { SHOPIFY_CONFIG } from './ShopifyConfig.ts';

const ADMIN_GRAPHQL_URL = `https://${SHOPIFY_CONFIG.domain}/admin/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

async function adminQuery(query: string, variables: Record<string, any> = {}) {
  try {
    const response = await fetch(ADMIN_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_CONFIG.adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }
    return json.data;
  } catch (error) {
    console.error('Admin API Error:', error);
    throw error;
  }
}

export const ShopifyAdminService = {
  async getOrdersCount() {
    const query = `
      query {
        ordersCount {
          count
        }
      }
    `;
    const data = await adminQuery(query);
    return data?.ordersCount?.count || 0;
  },

  async getTotalSales() {
    const query = `
      query {
        shopifyqlQuery(query: "FROM orders SHOW total_sales SINCE -30d UNTIL today") {
          __typename
          ... on TableResponse {
            tableData {
              rowData
            }
          }
        }
      }
    `;
    const data = await adminQuery(query);
    const rawValue = data.shopifyqlQuery?.tableData?.rowData?.[0]?.[0] || '0';
    return parseFloat(rawValue);
  },
};