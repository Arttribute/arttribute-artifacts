import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mapLicense = (license: LicenseType) => {
  switch (license) {
    case "open":
      return "Open";
    case "exclusive":
      return "Exclusive";
    case "non_commercial":
      return "Non Commercial";
    case "exclusive_non_commercial":
      return "Exclusive Non Commercial";
  }
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(new Date(date));
};
