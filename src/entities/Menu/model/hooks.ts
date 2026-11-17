"use client";

import { useQuery } from "@tanstack/react-query";
import type { MenuKey } from "@/shared/api";
import { menuQuery } from "./queries";

export const useMenuQuery = (key: MenuKey) => useQuery(menuQuery(key));
