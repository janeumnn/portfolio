import contact from '#/routes/contact';
import factory from '#/utils/factory';

const app = factory.createApp().basePath('/api').route('/contact', contact);

export const api = app;
export type AppType = typeof app;
