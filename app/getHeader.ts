export default (headers: string[], searchedHeader: string): string => {
  const header = headers.find((header) =>
    header.toLowerCase().startsWith(searchedHeader),
  );
  return header ? header.split(": ")[1] : "Unknown";
};
