import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (diffInSeconds < intervals.minute) {
    return "now";
  } else if (diffInSeconds < intervals.hour) {
    const minutes = Math.floor(diffInSeconds / intervals.minute);
    return `${minutes}m`;
  } else if (diffInSeconds < intervals.day) {
    const hours = Math.floor(diffInSeconds / intervals.hour);
    return `${hours}h`;
  } else if (diffInSeconds < intervals.week) {
    const days = Math.floor(diffInSeconds / intervals.day);
    return `${days}d`;
  } else if (diffInSeconds < intervals.month) {
    const weeks = Math.floor(diffInSeconds / intervals.week);
    return `${weeks}w`;
  } else if (diffInSeconds < intervals.year) {
    const months = Math.floor(diffInSeconds / intervals.month);
    return `${months}mo`;
  } else {
    const years = Math.floor(diffInSeconds / intervals.year);
    return `${years}y`;
  }
}

export function formatNumberShort(num: number): string {
  if (!num) return '';

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export const truncateText = (text: string, limit = 280): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "…";
};