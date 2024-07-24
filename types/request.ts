export class MissingRequiredFields extends Error {
  constructor (...fields: string[]) {
    super(`Some fields are missing! ${fields.toString()}`);
  }
}
