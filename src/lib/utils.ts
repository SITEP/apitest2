import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const deepParse = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj

    const result: Record<string, any> = {}

    for (const key in obj) {
      const value = obj[key]

      if (typeof value === "string") {
        try {
          result[key] = JSON.parse(value)
        } catch {
          result[key] = value
        }
      } else {
        result[key] = value
      }
    }

    return result
  }