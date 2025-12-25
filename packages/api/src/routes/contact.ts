import { sValidator } from '@hono/standard-validator';
import { tryCatch } from '@portfolio/utils';
import factory from '#/factory';
import { env, getRuntimeKey } from 'hono/adapter';
import { createMimeMessage } from 'mimetext';
import * as v from 'valibot';

const CreateContactSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  email: v.pipe(
    v.string(),
    v.minLength(1, 'Email is required'),
    v.email('Please enter a valid email address')
  ),
  message: v.pipe(v.string(), v.minLength(1, 'Message is required'))
});

const contact = factory.createApp().post(
  '/',
  sValidator('form', CreateContactSchema, (result, c) => {
    if (!result.success) return c.text(result.error[0].message, 400);
  }),
  async (c) => {
    if (getRuntimeKey() !== 'workerd' && !c.env?.CONTACT_MAIL) {
      return c.text('Service currently unavailable', 503);
    }

    const { EmailMessage } = await import('cloudflare:email');

    const { CF_EMAIL_ROUTING_FROM, CF_EMAIL_ROUTING_TO } = env<{
      CF_EMAIL_ROUTING_FROM: string;
      CF_EMAIL_ROUTING_TO: string;
    }>(c);

    const { name, email, message } = c.req.valid('form');

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

    const [, error] = await tryCatch(() => c.env.CONTACT_MAIL.send(emailMessage));

    if (error) {
      return c.text('Failed to send message', 500);
    }

    return c.json({ success: true });
  }
);

export default contact;
