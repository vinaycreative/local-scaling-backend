export function getQueryArray(query: any, key: string): string[] | undefined {
  if (Array.isArray(query[key])) return query[key]
  if (Array.isArray(query[`${key}[]`])) return query[`${key}[]`]
  if (typeof query[key] === "string") return [query[key]]
  if (typeof query[`${key}[]`] === "string") return [query[`${key}[]`]]
  return undefined
}
