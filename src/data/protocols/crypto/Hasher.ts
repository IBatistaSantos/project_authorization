interface IHasher {
  generate(value: string): Promise<string>;
}

export { IHasher };
