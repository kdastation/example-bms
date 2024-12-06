export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export function isNotNumber(value: any) {
  return typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)
}

export function isNumeric(value: any) {
  return value != null && value - parseFloat(value) + 1 >= 0
}

export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value)
}

export function isEmptyArray(value: any) {
  return isArray(value) && value.length === 0
}

type AnyFunction = (...args: any[]) => any

export function isFunction<T extends AnyFunction = AnyFunction>(value: any): value is T {
  return typeof value === 'function'
}

export function isDefined(value: any) {
  return typeof value !== 'undefined' && value !== undefined
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined' || value === undefined
}

export function isObject(value: any): value is Record<string, any> {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function') && !isArray(value)
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0
}

export function isNull(value: any): value is null {
  return value == null
}

export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isCssVar(value: string): boolean {
  return /^var\(--.+\)$/.test(value)
}

export function isEmpty(value: any): boolean {
  if (isArray(value)) return isEmptyArray(value)
  if (isObject(value)) return isEmptyObject(value)
  if (value == null || value === '') return true
  return false
}

export function isRefObject(val: any): val is { current: any } {
  return 'current' in val
}

export function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target)
}

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'

type Falsy = false | 0 | '' | null | undefined | 0n

export const isTruthy = <T>(value: T): value is Exclude<T, Falsy> => Boolean(value)

export const isFile = (value: unknown): value is File => value instanceof File
