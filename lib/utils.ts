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
      return "Non-Commercial";
    case "exclusive_non_commercial":
      return "Exclusive Non-Commercial";
  }
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(new Date(date));
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert image to base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file"));
    };
    reader.readAsDataURL(file);
  });
};
