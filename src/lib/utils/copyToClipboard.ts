/**
 * Copy the given text to the clipboard
 * @param text The text to copy to the clipboard
 * @returns A promise that resolves when the text is copied
 * @throws An error if the text cannot be copied
 */
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error("Failed to copy text to clipboard");
  }
};
