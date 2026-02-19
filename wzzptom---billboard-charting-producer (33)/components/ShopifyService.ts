import { SHOPIFY_CONFIG } from './ShopifyConfig.ts';

const GRAPHQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

async function shopifyQuery(query: string, variables: Record<string, any> = {}) {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
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
    console.error('Storefront API Error:', error);
    throw error;
  }
}

export const ShopifyService = {
  async login(email: string, password: string) {
    const mutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            message
          }
        }
      }
    `;

    const data = await shopifyQuery(mutation, { input: { email, password } });
    const result = data.customerAccessTokenCreate;

    if (result.customerUserErrors?.length > 0) {
      throw new Error(result.customerUserErrors[0].message);
    }

    return result.customerAccessToken;
  },

  async getCustomerDetails(accessToken: string) {
    const query = `
      query getCustomerDetails($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          firstName
          lastName
          email
          id
          metafield(namespace: "custom", key: "admin") {
            value
          }
        }
      }
    `;

    const data = await shopifyQuery(query, { customerAccessToken: accessToken });
    return data.customer;
  },

  async recoverPassword(email: string) {
    const mutation = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors { code message }
        }
      }
    `;

    const data = await shopifyQuery(mutation, { email });
    if (data.customerRecover.customerUserErrors?.length > 0) {
      throw new Error(data.customerRecover.customerUserErrors[0].message);
    }
    return true;
  },

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            code
            message
          }
        }
      }
    `;

    const data = await shopifyQuery(mutation, {
      input: { email, password, firstName, lastName }
    });

    const result = data.customerCreate;

    if (result.customerUserErrors?.length > 0) {
      throw new Error(result.customerUserErrors[0].message);
    }

    return result.customer;
  },

  async renewToken(currentToken: string) {
    const mutation = `
      mutation customerAccessTokenRenew($customerAccessToken: String!) {
        customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            message
          }
        }
      }
    `;

    const data = await shopifyQuery(mutation, { customerAccessToken: currentToken });
    const result = data.customerAccessTokenRenew;

    if (result.userErrors?.length > 0) {
      throw new Error(result.userErrors[0].message || 'Token renewal failed');
    }

    return result.customerAccessToken;
  },

  async getCustomerOrders(accessToken: string, first: number = 10) {
    const query = `
      query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                name
                orderNumber
                processedAt
                totalPrice {
                  amount
                  currencyCode
                }
                statusUrl
                financialStatus
                fulfillmentStatus
                lineItems(first: 5) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await shopifyQuery(query, { 
      customerAccessToken: accessToken,
      first 
    });

    return data.customer?.orders?.edges?.map((edge: any) => edge.node) || [];
  },
};