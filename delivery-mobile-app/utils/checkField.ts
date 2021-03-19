type MakeRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  { [P in K]-?: Exclude<T[P], [undefined]> };

export function checkField<T, K extends keyof T>(
  o: T | MakeRequired<T, K>,
  field?: K
): o is MakeRequired<T, K> {
  if (field) {
    return !!o[field];
  }

  return !!o;
}
