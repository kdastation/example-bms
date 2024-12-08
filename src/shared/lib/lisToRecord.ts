export const listToRecord = <T>(list: T[], getId: (item: T) => string) => {
  return list.reduce(
    (acc, item) => {
      acc[getId(item)] = item
      return acc
    },
    {} as Record<string, T>
  )
}
