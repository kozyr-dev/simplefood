"use client";

import { useQuery } from "@tanstack/react-query";
import { pageQuery } from "./queries";

export const usePageQuery = (slug: string) => useQuery(pageQuery(slug));
