import type { MenuItem, Settings } from "@/shared/api";

/*
 * What the header and footer show until the API answers, or if it can't:
 * a copy of the shop's settings and menus.
 */

export const defaultSettings: Settings = {
  siteName: "Simple Food",
  phone: "067 401 38 00",
  address: "м. Миколаїв, вул. 6-та Слобідська 101в",
  workingHours: "10:00-20:00",
  takingOrdersHours: "10:00-19:00",
  facebook: "https://www.facebook.com/simple.food.delivery",
  instagram: "https://www.instagram.com/simple_food_delivery/",
  seo: {
    title: "Simple Food",
    description: "Сервіс з приготування і доставки їжі в Миколаєві",
    shareImage: null,
  },
};

export const defaultHeaderMenu: MenuItem[] = [
  {
    id: "default-header-1",
    title: "Супи",
    link: "/simple-menu/#soup",
    className: null,
    group: "main",
  },
  {
    id: "default-header-2",
    title: "Основне",
    link: "/simple-menu/#main",
    className: null,
    group: "main",
  },
  {
    id: "default-header-3",
    title: "Сендвічі",
    link: "/simple-menu/#sandwich",
    className: null,
    group: "main",
  },
  {
    id: "default-header-4",
    title: "Паста",
    link: "/simple-menu/#pasta",
    className: null,
    group: "main",
  },
  {
    id: "default-header-5",
    title: "Салати",
    link: "/simple-menu/#salad",
    className: null,
    group: "main",
  },
  {
    id: "default-header-6",
    title: "Гарніри",
    link: "/simple-menu/#garnish",
    className: null,
    group: "main",
  },
  {
    id: "default-header-7",
    title: "Десерти",
    link: "/simple-menu/#desert",
    className: null,
    group: "main",
  },
  {
    id: "default-header-8",
    title: "Напої",
    link: "/simple-menu/#drinks",
    className: null,
    group: "main",
  },
  {
    id: "default-header-9",
    title: "Соуси",
    link: "/simple-menu/#sause",
    className: null,
    group: "main",
  },
  {
    id: "default-header-10",
    title: "Street Food",
    link: "/papasha-menu",
    className: "highlight3",
    group: "main",
  },
];

export const defaultFooterMenu: MenuItem[] = [
  {
    id: "default-footer-1",
    title: "Акції",
    link: "#",
    className: null,
    group: "main",
  },
  {
    id: "default-footer-2",
    title: "Про нас",
    link: "#",
    className: null,
    group: "main",
  },
  {
    id: "default-footer-3",
    title: "Доставка",
    link: "#",
    className: null,
    group: "main",
  },
  {
    id: "default-footer-4",
    title: "Новини та статтi",
    link: "#",
    className: null,
    group: "main",
  },
  {
    id: "default-footer-5",
    title: "Контакти",
    link: "#",
    className: null,
    group: "main",
  },
];

/** The dropdown: `main` items on top, `list` items (with icons) below. */
export const defaultDropdownMenu: MenuItem[] = [
  {
    id: "default-dropdown-1",
    title: "Меню",
    link: "/simple-menu",
    className: "highlight1",
    group: "main",
  },
  {
    id: "default-dropdown-2",
    title: "Корпоративне харчування",
    link: "/korporativne-harchuvannya",
    className: "highlight2",
    group: "main",
  },
  {
    id: "default-dropdown-3",
    title: "Особистий кабінет",
    link: "/account",
    className: "img_cabinet",
    group: "list",
  },
  {
    id: "default-dropdown-4",
    title: "Про нас",
    link: "/about-us",
    className: "img_about",
    group: "list",
  },
  {
    id: "default-dropdown-5",
    title: "Доставка",
    link: "/shipping",
    className: "img_delivery",
    group: "list",
  },
  {
    id: "default-dropdown-6",
    title: "Новини та статтi",
    link: "/news",
    className: "img_news",
    group: "list",
  },
  {
    id: "default-dropdown-7",
    title: "Акції",
    link: "/sale",
    className: "img_discount",
    group: "list",
  },
  {
    id: "default-dropdown-8",
    title: "Контакти",
    link: "/contact",
    className: "img_contacts",
    group: "list",
  },
];
