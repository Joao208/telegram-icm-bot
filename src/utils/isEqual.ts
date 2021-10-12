const isEqual = (a: Object, b: string): boolean => {
  // @ts-ignore
  return a.reply_to_message && a.reply_to_message.text == b;
};

export { isEqual };
