import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Use these instead of next/link and
 * next/navigation so hrefs automatically gain the correct locale prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
