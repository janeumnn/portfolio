import { vValidator } from '@hono/valibot-validator';
import { tryCatch } from '@portfolio/utils';
import factory from '#/utils/factory';
import { validateToken } from '#utils/turnstile';
import { env, getRuntimeKey } from 'hono/adapter';
import { createMimeMessage } from 'mimetext';
import * as v from 'valibot';

const CreateContactSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  email: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.email()),
  message: v.pipe(v.string(), v.trim(), v.nonEmpty()),
  verification: v.optional(v.string())
});

const contact = factory.createApp().post(
  '/',
  vValidator('form', CreateContactSchema, (result, c) => {
    if (!result.success) return c.text(result.issues[0].message, 400);
  }),
  async (c) => {
    const { CF_EMAIL_ROUTING_FROM, CF_EMAIL_ROUTING_TO, CF_TURNSTILE_SECRET_KEY } = env<{
      CF_EMAIL_ROUTING_FROM?: string;
      CF_EMAIL_ROUTING_TO?: string;
      CF_TURNSTILE_SECRET_KEY?: string;
    }>(c);

    const { name, email, message, verification } = c.req.valid('form');

    if (CF_TURNSTILE_SECRET_KEY) {
      if (!verification) return c.text('Verification token is missing.', 400);

      const { error } = await validateToken(verification, CF_TURNSTILE_SECRET_KEY);
      if (error) return c.text(error, 403);
    }

    if (
      getRuntimeKey() !== 'workerd' ||
      !c.env?.CONTACT_MAIL ||
      !CF_EMAIL_ROUTING_FROM ||
      !CF_EMAIL_ROUTING_TO
    ) {
      return c.text('Service currently unavailable', 503);
    }

    const { EmailMessage } = await import('cloudflare:email');

    const mimeMessage = createMimeMessage();

    mimeMessage.setSender({ name, addr: CF_EMAIL_ROUTING_FROM });
    mimeMessage.setRecipient(CF_EMAIL_ROUTING_TO);
    mimeMessage.setSubject(`Message from ${name}`);

    mimeMessage.addMessage({
      contentType: 'text/html',
      data: `
        A new message from <a href="mailto:${email}">"${name}" &lt;${email}&gt;</a>:<br><br>
        ${message.replace(/\n/g, '<br>')}
      `
    });

    const emailMessage = new EmailMessage(
      CF_EMAIL_ROUTING_FROM,
      CF_EMAIL_ROUTING_TO,
      mimeMessage.asRaw()
    );

    const [, error] = await tryCatch(() => c.env.CONTACT_MAIL?.send(emailMessage));

    if (error) return c.text('Failed to send message', 500);

    return c.json({ success: true });
  }
);

export default contact;
