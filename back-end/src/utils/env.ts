
export const env = (value: string) => {
  return process.env[value] ?? ''
}
