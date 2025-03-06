export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithOptional<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type Nil = null | undefined;

export type Nullable<T> = T | Nil;

export type ConstructorOf<T> = {
  prototype: T;
  new (...arguments_: never[]): T;
};

export function assertIsNonNullable<T>(
  value: unknown,
  ...infos: unknown[]
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Nullish assertion Error: "${String(value)}"; ${infos?.join(' ')}`);
  }
}

export function isInstanceOf<T>(elementType: ConstructorOf<T>, value: unknown): value is T {
  return value instanceof elementType;
}

export function assertIsInstanceOf<T>(
  elementType: ConstructorOf<T>,
  value: unknown,
  ...infos: string[]
): asserts value is T {
  assertIsNonNullable(value, `#${String(elementType)}`);
  if (!(value instanceof elementType)) {
    throw new TypeError(
      `Not expected value: ${JSON.stringify(value)} of type: "${String(elementType)}"; ${infos?.join(' ')}'`,
    );
  }
}

export function isNil<T>(value: Nullable<T>): value is Nil {
  return value === null || value === undefined;
}

export function hasSome<T>(value: unknown): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
