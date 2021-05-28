class NameInUseError extends Error {
  constructor() {
    super("Name already registered");
    this.name = "NameInUseError";
  }
}

export { NameInUseError };
