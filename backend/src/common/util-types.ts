/* this type alias "extracts" (infers) the correct type from a class */
export type ClassAsType<T> = T extends new () => infer R ? R : never;
export type ValueOf<T> = T[keyof T];
