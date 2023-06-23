const DASHBOARD_ROUTES = {
  DASHBOARD_BLOG: '/dashboard/blog',
  DASHBOARD_BLOG_CREATE: '/dashboard/blog/create',
  DASHBOARD_BLOG_EDIT: (id: number) => `/dashboard/blog/${id}`,
  DASHBOARD_HOME: '/dashboard',
  LOGIN: '/login',
};

const PORTFOLIO_ROUTES = {
  ABOUT: '/about',
  BLOG_ARTICLE: (slug: string) => `/blog/${slug}`,
  BLOG_LIST: '/blog',
};

export const ROUTES = {
  FEED: '/feed.xml',
  LANDING: '/',
  ...DASHBOARD_ROUTES,
  ...PORTFOLIO_ROUTES,
};
