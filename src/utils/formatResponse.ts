const formatResponse = (str: string): number => {
  return parseFloat(str.replace(/[^\d]+/g, ""));
};

export { formatResponse };
