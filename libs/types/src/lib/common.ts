/**
 * This type allows any type to also accept null or undefined values.
 */
export type Nullable<T> = T | null | undefined;

/**
 * This type allows you to make all properties of an object and any nested objects optional.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * This type represents a value that can be either a single instance of a type, or an array of instances of that type.
 */
export type OneOrMany<T> = T | T[];

/**
 * This type gives you the union of all value types in an object.
 */
export type ValueOf<T> = T[keyof T];

/**
 * This type gives you all keys of an object whose values match a certain type.
 */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

/**
 * This type gives you the difference between two types by removing all properties that exist in both types.
 */
export type Diff<T, U> = T extends U ? never : T;

/**
 *
 */
export type Obj = {
  [key: string]: string | number | boolean | null | undefined | Obj[] | { [key: string]: Obj };
};
