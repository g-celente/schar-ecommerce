export const SITE_NAME = "Schar";
export const SITE_DESCRIPTION = "Premium e-commerce experience";

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  login: "/login",
  register: "/register",
  account: "/account",
} as const;

export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 48,
} as const;

export const CURRENCY = {
  code: "USD",
  locale: "en-US",
} as const;
