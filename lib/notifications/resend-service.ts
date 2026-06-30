import type { INotificationService, NotificationPayload, SendResult } from "./types";

type ResendSendResponse = {
  id?: string;
  message?: string;
  name?: string;
};

export class ResendNotificationService implements INotificationService {
  constructor(
    private readonly options: {
      apiKey: string;
      from: string;
      forceTo?: string;
    },
  ) {}

  async send(payload: NotificationPayload): Promise<SendResult> {
    const recipients = this.options.forceTo
      ? [this.options.forceTo]
      : (Array.isArray(payload.to) ? payload.to : [payload.to]).map((recipient) => recipient.email);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.options.from,
        to: recipients,
        subject: payload.subject,
        text: payload.text,
        ...(payload.html ? { html: payload.html } : {}),
        ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
        ...(payload.replyTo ? { reply_to: payload.replyTo.email } : {}),
        ...(payload.meta
          ? {
              tags: Object.entries(payload.meta).map(([name, value]) => ({
                name,
                value: value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256),
              })),
            }
          : {}),
      }),
    });

    const data = (await response.json().catch(() => ({}))) as ResendSendResponse;

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.name || "Resend rejected the email request.",
      };
    }

    return { success: true, id: data.id };
  }
}
