import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const baseUrl = 'https://noteskeeper-dxrn.onrender.com'
// export const baseUrl = "http://localhost:5000";
