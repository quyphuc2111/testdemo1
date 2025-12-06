import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logEvent(eventName: string, data?: Record<string, any>) {
  console.log(`[Telemetry] ${eventName}`, data);
  // In a real app, this would send data to an analytics service
}
