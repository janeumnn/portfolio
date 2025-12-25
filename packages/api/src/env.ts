export type Env = {
  Bindings: {
    CONTACT_MAIL: {
      send: (message: EmailMessage) => Promise<void>;
    };
  };
};
