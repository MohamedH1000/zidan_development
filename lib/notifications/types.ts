/**
 * Notification abstraction.
 *
 * Design rationale (SOLID):
 *  - Dependency Inversion: server actions depend on `INotificationService`,
 *    not on any concrete provider. The provider is injected via the factory.
 *  - Open/Closed: a new provider (Resend, nodemailer, SES, a CRM webhook…)
 *    is added by creating a new class that implements the interface — existing
 *    code never changes.
 */

export interface NotificationRecipient {
  email: string;
  name?: string;
}

export interface NotificationPayload {
  to: NotificationRecipient | NotificationRecipient[];
  replyTo?: NotificationRecipient;
  subject: string;
  text: string;
  /** Optional HTML body. Must already be sanitized by the caller. */
  html?: string;
  /** Structured tags for logging/analytics, never serialized into user output. */
  meta?: Record<string, string>;
}

export interface SendResult {
  success: boolean;
  /** Provider message id when available. */
  id?: string;
  /** Safe, non-sensitive error description. */
  error?: string;
}

export interface INotificationService {
  send(payload: NotificationPayload): Promise<SendResult>;
}
