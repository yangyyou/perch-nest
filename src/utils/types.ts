export type DeepRequire<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequire<T[P]> : T[P];
};
