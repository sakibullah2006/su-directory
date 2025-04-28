import { clsx, type ClassValue } from "clsx"
import slugify from "slugify"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}


export const slugifyTitle = (title: string) => {

  const slug = slugify(title, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })

  return slug
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}