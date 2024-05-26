import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatName = (name: string | null) => {
  if (!name) return '@dex_fans'

  const nameArr = name.split(' ')
  const temp = nameArr.map(item => item.toLowerCase())

  return `@${temp.join('_')}`
}
