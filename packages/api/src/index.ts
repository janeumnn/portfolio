import factory from '#/utils/factory';
import ping from '#routes/ping';

const app = factory.createApp().basePath('/api').route('/ping', ping);

export const api = app;
export type AppType = typeof app;
