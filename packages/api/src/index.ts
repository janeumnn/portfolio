import factory from '#/factory';
import contact from '#/routes/contact';

const app = factory.createApp().basePath('/api').route('/contact', contact);

export const api = app;
export type AppType = typeof app;
