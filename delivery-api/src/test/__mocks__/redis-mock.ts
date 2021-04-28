const client = {
  get: jest.fn((err, value) => value()),
  on: jest.fn(),
};

export const redisMock = {
  client,
  createClient: jest.fn().mockReturnValue(client),
};
