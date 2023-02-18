const minLength = (min: number) => {
  return (input: string) =>
    input.length < min ? `Value must be at least ${min} characters` : null;
};

const isEmail = () => {
  const re = /\S+@\S+\.\S+/;
  return (input: string) =>
    re.test(input) ? null : "Must be a valid email address";
};

export { minLength, isEmail };
