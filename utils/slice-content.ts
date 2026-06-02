export function sliceContent(content: string, maxLength: number = 10) {
  return content.length > maxLength
    ? content.slice(0, maxLength) + "..."
    : content;
}
