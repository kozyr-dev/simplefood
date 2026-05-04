import { JSX } from "react";

// globally used types
export type SiteOptions = {
  data: {
    workingHours: string;
    facebook: string;
    instagram: string;
    takingOrdersHours: string;
    phone: string;
    address: string;
    SiteName: string;
    SEO: SEO;
  };
  meta: object;
};

export type SEO = {
  seo_title: string;
  seo_description: string;
  shareImage?: string;
};

export type HeaderMenu = {
  id: number;
  Title: string;
  Link: string;
  Classname?: string | null;
}[];

export type FooterMenu = {
  id: number;
  Title: string;
  Link: string;
  Classname?: string | null;
}[];

export type DropDownMenu = {
  id: number;
  Title: string;
  Link: string;
  Classname?: string | null;
}[];

export type ImageProps = {
  id: string;
  url: string;
  width: number;
  height: number;
  formats?: {
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
    small: {
      url: string;
    };
  };
  alternativeText: string;
};

export type ButtonProps = {
  url: string;
  text: string;
};
export interface Button {
  url?: string | undefined;
  children: JSX.Element | string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export type Order = {
  address: string;
  name: string;
  email: string;
  phone: string;
  dishes: string;
  amount: number;
  comments: string;
  //user: User;
};

export interface ContactUsFormValues {
  name: string;
  message: string;
  email: string;
}
export interface SignInFormValues {
  username: string;
  password: string;
}
