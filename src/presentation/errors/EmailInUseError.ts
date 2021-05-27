class EmailInUseError extends Error {
  constructor() {
    super("Email already registered");
    this.name = "EmailInUseError";
  }
}

export { EmailInUseError };
