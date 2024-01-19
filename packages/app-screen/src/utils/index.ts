export function getAssetPath(filePath: string) {
  return `${import.meta.env.BASE_URL}${filePath}`
}
