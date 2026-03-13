export const SITE_NAME = "SCHAR";
export const SITE_DESCRIPTION = "Conforto, arte e estilo para o seu dia a dia.";

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  drops: "/drops",
  about: "/sobre",
  contact: "/contato",
  cart: "/cart",
  login: "/login",
  register: "/register",
  account: "/account",
  orders: "/orders",
} as const;

export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 48,
} as const;

export const CURRENCY = {
  code: "BRL",
  locale: "pt-BR",
} as const;
