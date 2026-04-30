import { HeaderMenu, FooterMenu, DropDownMenu } from "@/shared/types/types";

export interface HeaderMenuResponseType {
  data: {
    id: number;
    createdAt: string;
    menuItem: HeaderMenu;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}

export interface FooterMenuResponseType {
  data: {
    id: number;
    createdAt: string;
    footerMenu: FooterMenu;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}

export interface DropdownMenuResponseType {
  data: {
    id: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    menuItem: DropDownMenu;
    menuListItem: DropDownMenu;
  };
  meta: object;
}
