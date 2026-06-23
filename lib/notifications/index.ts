import { ConsoleNotificationService } from "./console-service";
import type { INotificationService } from "./types";

export type { INotificationService, NotificationPayload, SendResult } from "./types";

/**
 * Composition root for the notification subsystem.
 *
 * Today it returns the console-based provider. When a real provider is ready,
 * branch on an environment variable here — for example:
 *
 *   if (process.env.RESEND_API_KEY) return new ResendNotificationService(...)
 *
 * No call-site needs to change because everything depends on the interface.
 */
let cached: INotificationService | null = null;

export function createNotificationService(): INotificationService {
  // Services in Next.js are long-lived module singletons; cache once.
  if (cached) return cached;
  cached = new ConsoleNotificationService({
    silent: process.env.NODE_ENV === "production",
  });
  return cached;
}
