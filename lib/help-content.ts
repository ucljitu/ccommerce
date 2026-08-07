import { contactConfig } from "@/lib/contact-config";

export type HelpStep = {
  title: string;
  detail: string;
};

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  status: "published" | "draft" | "coming-soon" | "archived";
  readingTime: number;
  beforeYouStart?: string[];
  steps: HelpStep[];
  notes?: string[];
  problems?: { problem: string; solution: string }[];
};

export type HelpCategory = {
  slug: string;
  title: string;
  description: string;
  articles: HelpArticle[];
};

const article = (
  slug: string,
  title: string,
  summary: string,
  keywords: string[],
  steps: HelpStep[],
  extra: Partial<HelpArticle> = {},
): HelpArticle => ({
  slug,
  title,
  summary,
  keywords,
  status: "published",
  readingTime: Math.max(2, Math.ceil(steps.length / 2)),
  steps,
  ...extra,
});

export const helpCategories: HelpCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Set up your store, add products and prepare to receive orders.",
    articles: [
      article("create-store-account", "Create Your Store Account", "Create your C Commerce account and open the merchant dashboard.", ["account", "sign up", "register", "dashboard"], [
        { title: "Open the registration page", detail: "Select Start Free Trial from the C Commerce website." },
        { title: "Enter your details", detail: "Add your name, business email, mobile number and a secure password." },
        { title: "Create the account", detail: "Select Create Account and sign in to the merchant dashboard." },
      ], { beforeYouStart: ["Keep a working mobile number and business email ready."] }),
      article("complete-business-information", "Complete Your Business Information", "Add the name, contact details and address customers should see.", ["business", "store information", "contact", "address"], [
        { title: "Open Store Settings", detail: "From the merchant dashboard, select Store Settings." },
        { title: "Add general details", detail: "In General, enter your Store Name, Store Tagline and Store Description." },
        { title: "Add contact details", detail: "Open Contact and enter the Business Email, WhatsApp Number, Phone Number and Business Address." },
        { title: "Save your details", detail: "Select Save Settings, then select Save Contact after updating the Contact tab." },
      ]),
      article("add-first-product", "Add Your First Product", "Add a product with its name, price, stock and category information.", ["add product", "price", "stock", "category", "photo"], [
        { title: "Open Products", detail: "From the merchant dashboard, select Products." },
        { title: "Start a new product", detail: "Select Add Product." },
        { title: "Enter product information", detail: "Add the product name, price, stock, category and available product details." },
        { title: "Save the product", detail: "Review the information and select the available save action." },
      ], { notes: ["Only publish product information and photos that you have permission to use."] }),
      article("set-payments-delivery", "Set Payment and Delivery Options", "Prepare Cash on Delivery and location-based delivery charges.", ["payment", "delivery", "cod", "charge"], [
        { title: "Open Payments", detail: "From the merchant dashboard, select Payments." },
        { title: "Review Cash on Delivery", detail: "Open Payment Gateways and enable Cash on Delivery if you want customers to pay at delivery." },
        { title: "Open Delivery Charge", detail: "Select Delivery Charge from the dashboard sidebar." },
        { title: "Set your charges", detail: "Review district charges and the Free Delivery Above amount, then select Save All Changes." },
      ]),
      article("publish-store", "Publish Your Store", "Check your store details and make the storefront available to customers.", ["publish", "launch", "active", "store"], [
        { title: "Review the storefront", detail: "Check your store name, logo, products, payment options and delivery charges." },
        { title: "Open Store Settings", detail: "From the merchant dashboard, select Store Settings." },
        { title: "Turn on Store Active", detail: "In General, enable Store Active." },
        { title: "Save and test", detail: "Select Save Settings and open your store link on a phone before sharing it." },
      ]),
    ],
  },
  {
    slug: "products",
    title: "Products and Inventory",
    description: "Manage products, categories, prices and stock.",
    articles: [
      article("add-product", "Add a Product", "Create a product listing for your online store.", ["product", "add", "price", "stock"], [
        { title: "Open Products", detail: "Select Products from the merchant dashboard sidebar." },
        { title: "Select Add Product", detail: "Use the Add Product button at the top of the product list." },
        { title: "Add the details", detail: "Enter the product name, category, price, stock and other available information." },
        { title: "Save the product", detail: "Review the details and select the available save action." },
      ]),
      article("edit-delete-product", "Edit or Delete a Product", "Update a product or remove one you no longer sell.", ["edit product", "delete product", "remove"], [
        { title: "Open Products", detail: "Select Products from the merchant dashboard." },
        { title: "Find the product", detail: "Use Search products or find the product in the table." },
        { title: "Choose an action", detail: "Use the Edit action to update it, or the Delete action to remove it." },
        { title: "Confirm your changes", detail: "Review and save an edit. Confirm a deletion only when you no longer need the product." },
      ], { notes: ["Deleting a product can remove it from your storefront. Edit or hide it when you may need it again."] }),
      article("manage-stock", "Manage Product Stock", "Keep product stock levels accurate and identify low-stock items.", ["inventory", "stock", "low stock", "out of stock"], [
        { title: "Open Products", detail: "Select Products from the merchant dashboard." },
        { title: "Check the Stock column", detail: "Review the stock number and the Low Stock or Out of Stock status." },
        { title: "Edit the product", detail: "Select the Edit action for the product you need to update." },
        { title: "Save the new stock", detail: "Enter the current quantity and save the product." },
      ]),
    ],
  },
  {
    slug: "payments",
    title: "Payments",
    description: "Set up the payment methods available for your store.",
    articles: [
      article("cash-on-delivery", "Set Up Cash on Delivery", "Let customers place an order and pay when it is delivered.", ["cash on delivery", "cod", "payment"], [
        { title: "Open Payments", detail: "Select Payments from the merchant dashboard." },
        { title: "Open Payment Gateways", detail: "Select the Payment Gateways tab." },
        { title: "Enable Cash on Delivery", detail: "Turn on Cash on Delivery." },
        { title: "Save the setting", detail: "Select Save Payment Settings." },
      ]),
      article("check-payment-status", "Check Payment Status", "Review payment method and status for store transactions.", ["payment status", "transaction", "pending", "completed"], [
        { title: "Open Payments", detail: "Select Payments from the merchant dashboard." },
        { title: "Open Transactions", detail: "Select the Transactions tab." },
        { title: "Find the transaction", detail: "Match the TXN ID or Order number with the customer order." },
        { title: "Review the status", detail: "Check the Method, Net amount and Status columns." },
      ]),
      article("view-transactions", "View Transaction Records", "See transaction IDs, order references, amounts and payment status.", ["transactions", "history", "revenue", "payment records"], [
        { title: "Open Payments", detail: "Select Payments from the merchant dashboard." },
        { title: "Select Transactions", detail: "The Transaction History table lists recorded payments." },
        { title: "Review the record", detail: "Use the TXN ID and Order columns to identify the payment." },
      ]),
    ],
  },
  {
    slug: "delivery",
    title: "Delivery and Shipping",
    description: "Set delivery charges and manage order delivery.",
    articles: [
      article("set-delivery-charges", "Set Delivery Charges", "Set the amount customers pay for delivery.", ["delivery charge", "shipping fee", "district"], [
        { title: "Open Delivery Charge", detail: "Select Delivery Charge from the merchant dashboard sidebar." },
        { title: "Review the district list", detail: "Find the district you want to update." },
        { title: "Enter the charges", detail: "Set the available inside-city and outside-city delivery amounts." },
        { title: "Save the changes", detail: "Select Save All Changes." },
      ]),
      article("set-charges-by-district", "Set Charges by District", "Use a different delivery charge for each available district.", ["district delivery", "dhaka", "shipping area"], [
        { title: "Open Delivery Charge", detail: "Select Delivery Charge from the merchant dashboard." },
        { title: "Find a district", detail: "Use District-wise Delivery Charges to locate the district." },
        { title: "Enable and edit", detail: "Enable the district and enter its available delivery charges." },
        { title: "Save all changes", detail: "Select Save All Changes after reviewing every edited row." },
      ]),
      article("free-delivery-rule", "Create a Free Delivery Rule", "Offer free delivery when an order reaches a set amount.", ["free delivery", "threshold", "order amount"], [
        { title: "Open Delivery Charge", detail: "Select Delivery Charge from the merchant dashboard." },
        { title: "Find Free Delivery Above", detail: "Review the order amount shown in the delivery settings." },
        { title: "Set the amount", detail: "Enter the minimum order value for free delivery." },
        { title: "Save the rule", detail: "Select Save All Changes." },
      ]),
      article("update-delivery-status", "Update Delivery Status", "Keep the order status accurate as an order is processed and delivered.", ["delivery status", "shipped", "delivered", "order"], [
        { title: "Open Orders", detail: "Select Orders from the merchant dashboard." },
        { title: "Find the order", detail: "Use Search orders or select the matching status tab." },
        { title: "Open the order", detail: "Use the View action for the correct Order ID." },
        { title: "Update the status", detail: "Choose the available status that matches the order progress and save it." },
      ]),
    ],
  },
  {
    slug: "store-settings",
    title: "Store Settings",
    description: "Update your store design, domain and business information.",
    articles: [
      article("update-store-information", "Update Store Information", "Change your store name, description and customer contact details.", ["store settings", "name", "description", "contact"], [
        { title: "Open Store Settings", detail: "Select Store Settings from the merchant dashboard." },
        { title: "Update General Settings", detail: "Edit the Store Name, Store Tagline or Store Description." },
        { title: "Update Contact Information", detail: "Open Contact to edit the Business Email, phone, WhatsApp number or address." },
        { title: "Save each section", detail: "Select Save Settings or Save Contact in the section you changed." },
      ]),
      article("upload-logo", "Upload Your Logo", "Add your business logo to your online store.", ["logo", "branding", "upload"], [
        { title: "Open Store Settings", detail: "Select Store Settings from the merchant dashboard." },
        { title: "Find Store Logo", detail: "In General Settings, locate the Store Logo section." },
        { title: "Select Upload Logo", detail: "Choose a clear image from your device." },
        { title: "Save settings", detail: "Select Save Settings after the logo finishes uploading." },
      ], { notes: ["Use a clear logo with enough empty space around it."] }),
      article("connect-custom-domain", "Connect Your Own Domain", "Connect a domain you own on the Business plan.", ["custom domain", "dns", "business plan", "ssl"], [
        { title: "Open Domain Settings", detail: "Select Domain Settings from the merchant dashboard." },
        { title: "Enter Your Domain", detail: "In Custom Domain, enter the domain you own and select Connect." },
        { title: "Add the shown DNS records", detail: "Sign in to your domain provider and copy the DNS records displayed by C Commerce." },
        { title: "Wait for verification", detail: "DNS changes can take time. Return to Domain Settings to review the connection status." },
      ], { beforeYouStart: ["Custom Domain is shown as a Business plan feature.", "You must own the domain and be able to edit its DNS records."], notes: ["DNS means the settings that point your domain to your store. Use the exact values shown in your own dashboard."] }),
      article("add-whatsapp-button", "Add a WhatsApp Button", "Add your business WhatsApp number for customer contact.", ["whatsapp", "contact button", "phone"], [
        { title: "Open Store Settings", detail: "Select Store Settings from the merchant dashboard." },
        { title: "Open Contact", detail: "Select the Contact tab." },
        { title: "Enter WhatsApp Number", detail: "Add your business number with the Bangladesh country code." },
        { title: "Save contact details", detail: "Select Save Contact and test the button on your storefront." },
      ]),
    ],
  },
  {
    slug: "orders-reports",
    title: "Orders and Reports",
    description: "Manage customer orders and review your business activity.",
    articles: [
      article("view-orders", "View Customer Orders", "Find an order and review its customer, payment and delivery details.", ["orders", "customer order", "order id"], [
        { title: "Open Orders", detail: "Select Orders from the merchant dashboard." },
        { title: "Find the order", detail: "Use Search orders or a status tab such as Pending or Delivered." },
        { title: "Open the order", detail: "Use the View action beside the matching Order ID." },
      ]),
      article("update-order-status", "Update Order Status", "Move an order through the available processing and delivery stages.", ["order status", "pending", "processing", "shipped", "delivered", "cancelled"], [
        { title: "Open Orders", detail: "Select Orders from the merchant dashboard." },
        { title: "Open the correct order", detail: "Check the Order ID and use the View action." },
        { title: "Choose the status", detail: "Select the status that matches the order: Pending, Processing, Shipped, Delivered or Cancelled." },
        { title: "Save the change", detail: "Confirm the update and check that the order appears in the correct status tab." },
      ]),
      article("view-sales-reports", "View Sales Reports", "Review revenue, orders, products and date-based business activity.", ["sales report", "revenue", "analytics", "date"], [
        { title: "Open Reports", detail: "Select Reports from the merchant dashboard." },
        { title: "Choose a period", detail: "Select Today, This Week, This Month, Last 3 Months or Custom." },
        { title: "Review Sales Report", detail: "Check Total Revenue, Total Orders and Avg. Order Value." },
        { title: "Review Top Products", detail: "Open Top Products to compare units sold and product revenue." },
      ]),
    ],
  },
];

export const publishedCategories = helpCategories
  .map((category) => ({ ...category, articles: category.articles.filter((item) => item.status === "published") }))
  .filter((category) => category.articles.length > 0);

export const publishedArticles = publishedCategories.flatMap((category) =>
  category.articles.map((item) => ({ ...item, categorySlug: category.slug, categoryTitle: category.title })),
);

export const popularArticleSlugs = [
  "create-store-account",
  "add-first-product",
  "view-orders",
  "set-delivery-charges",
  "connect-custom-domain",
  "add-whatsapp-button",
];

export const support = {
  email: contactConfig.supportEmail,
  whatsappNumber: contactConfig.whatsappNumber,
  whatsappMessage: "Hello C Commerce Support, I need help with my store.",
  availability: contactConfig.availabilityText,
};

export function getHelpCategory(slug: string) {
  return publishedCategories.find((category) => category.slug === slug);
}

export function getHelpArticle(categorySlug: string, articleSlug: string) {
  const category = getHelpCategory(categorySlug);
  const article = category?.articles.find((item) => item.slug === articleSlug);
  return category && article ? { category, article } : undefined;
}

export function helpArticleHref(categorySlug: string, articleSlug: string) {
  return `/help/${categorySlug}/${articleSlug}`;
}
