import type { INotificationService, NotificationPayload, SendResult } from "./types";

/**
 * Default provider used in development and until an email/CRM provider is wired.
 * It validates the contract end-to-end without sending real messages, and writes
 * a structured log line so submissions can be inspected locally.
 *
 * Swap this out by registering a new provider in `createNotificationService`.
 */
export class ConsoleNotificationService implements INotificationService {
  constructor(private readonly options = { silent: false }) {}

  async send(payload: NotificationPayload): Promise<SendResult> {
    const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];

    if (!this.options.silent) {
      console.info("[notifications] captured submission", {
        subject: payload.subject,
        to: recipients.map((r) => r.email),
        replyTo: payload.replyTo?.email,
        attachments: payload.attachments?.map((attachment) => attachment.filename),
        meta: payload.meta,
        preview: payload.text.slice(0, 160),
      });
    }

    // Simulate async I/O so callers handle the Promise correctly from day one.
    await Promise.resolve();

    return {
      success: true,
      id: `local_${Math.random().toString(36).slice(2, 10)}`,
    };
  }
}

export type { INotificationService, NotificationPayload, SendResult };
