const client = {
  get: jest.fn((err, value) => value()),
  on: jest.fn(),
  set: jest.fn((err, value) => {
    try {
      value();
    } catch (err) {}
  }),
};

export const redisMock = {
  client,
  createClient: jest.fn().mockReturnValue(client),
};
