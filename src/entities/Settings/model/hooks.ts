"use client";

import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "./queries";

export const useSettingsQuery = () => useQuery(settingsQuery());
