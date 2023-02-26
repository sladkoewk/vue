const minLength = (input: string, min: number): boolean | string =>
  input.length < min ? `Value must be at least ${min} characters` : true;

const isEmail = (input: string): boolean | string => {
  const re = /\S+@\S+\.\S+/;
  return re.test(input) ? true : "Must be a valid email address";
};

export const validators: Validators = { minLength, isEmail };

export interface Validators {
  minLength: (input: string, min: number) => boolean | string;
  isEmail: (input: string) => boolean | string;
}
