import { DropDownMenu, HeaderMenu, SiteOptions } from "../types/types";

export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

export const defaultSiteOptions: SiteOptions = {
  data: {
    phone: "067 401 38 00",
    workingHours: "10:00-20:00",
    takingOrdersHours: "10:00-19:00",
    facebook: "https://www.facebook.com/simple.food.delivery",
    instagram: "https://www.instagram.com/simple_food_delivery/",
    SiteName: "Simple Food",
    address: "м. Миколаїв, вул. 6-та Слобідська 101в",
    SEO: {
      seo_title: "Simple Food",
      seo_description: "Сервіс з приготування і доставки їжі в Миколаєві",
    },
  },
  meta: {},
};

export const defaultHeaderMenu: HeaderMenu = [
  {
    id: 2,
    Title: "Супи",
    Link: "/simple-menu/#soup",
    Classname: null,
  },
  {
    id: 3,
    Title: "Основне",
    Link: "/simple-menu/#main",
    Classname: null,
  },
  {
    id: 4,
    Title: "Сендвічі",
    Link: "/simple-menu/#sandwich",
    Classname: null,
  },
  {
    id: 5,
    Title: "Паста",
    Link: "/simple-menu/#pasta",
    Classname: null,
  },
  {
    id: 6,
    Title: "Салати",
    Link: "/simple-menu/#salad",
    Classname: null,
  },
  {
    id: 7,
    Title: "Гарніри",
    Link: "/simple-menu/#garnish",
    Classname: null,
  },
  {
    id: 8,
    Title: "Десерти",
    Link: "/simple-menu/#desert",
    Classname: null,
  },
  {
    id: 9,
    Title: "Напої",
    Link: "/simple-menu/#drinks",
    Classname: null,
  },
  {
    id: 10,
    Title: "Соуси",
    Link: "/simple-menu/#sause",
    Classname: null,
  },
  {
    id: 11,
    Title: "Street Food",
    Link: "/papasha-menu",
    Classname: "highlight3",
  },
];

export const defaultDropDownMenu: DropDownMenu = {
  menuItem: [
    {
      id: 17,
      Title: "Меню",
      Link: "/simple-menu",
      Classname: "highlight1",
    },
    {
      id: 19,
      Title: "Корпоративне харчування",
      Link: "/korporativne-harchuvannya",
      Classname: "highlight2",
    },
  ],
  menuListItem: [
    {
      id: 7,
      Title: "Особистий кабінет",
      Link: "/account",
      Classname: "img_cabinet",
    },
    {
      id: 8,
      Title: "Про нас",
      Link: "/about-us",
      Classname: "img_about",
    },
    {
      id: 9,
      Title: "Доставка",
      Link: "/shipping",
      Classname: "img_delivery",
    },
    {
      id: 10,
      Title: "Новини та статтi",
      Link: "/news",
      Classname: "img_news",
    },
    {
      id: 11,
      Title: "Акції",
      Link: "/sale",
      Classname: "img_discount",
    },
    {
      id: 12,
      Title: "Контакти",
      Link: "/contact",
      Classname: "img_contacts",
    },
  ],
};
