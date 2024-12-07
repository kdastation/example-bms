type ValueOf<T> = T[keyof T]

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type AnyFunction = (...args: any[]) => any
