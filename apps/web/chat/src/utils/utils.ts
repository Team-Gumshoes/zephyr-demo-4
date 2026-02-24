export const uniqueOptions = <T extends { id: string }>(options: T[]): T[] => {
  return options.filter(
    (option, index, options) =>
      options.findIndex((candidate) => candidate.id === option.id) === index,
  );
};
