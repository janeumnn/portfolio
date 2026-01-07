export type AppContext = {
  Bindings: {
    CONTACT_MAIL?: {
      send: (message: EmailMessage) => Promise<void>;
    };
  };
};
