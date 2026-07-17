export function padString(str: string, length: number, char: string = "0") {
  return str.padStart(length, char);
}
