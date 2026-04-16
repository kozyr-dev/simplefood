import { HeaderMenu, FooterMenu, DropDownMenu } from "@/shared/types/types";

export interface HeaderMenuResponseType {
  data: {
    createdAt: string;
    id: number;
    menuItem: HeaderMenu;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}

export interface FooterMenuResponseType {
  data: {
    createdAt: string;
    id: number;
    menuItem: FooterMenu;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}

export interface DropdownMenuResponseType {
  data: {
    createdAt: string;
    id: number;
    menuItem: DropDownMenu;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}
