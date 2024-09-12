function generateRandomString(length = 32) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  let result = '';
  const arrayBuffer = new Uint8Array(length);
  crypto.getRandomValues(arrayBuffer);

  for (let i = 0; i < length; i++) {
    // @ts-expect-error The ArrayBuffer is not undefined
    result += charset.charAt(arrayBuffer[i] % charset.length);
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 500,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default {
  debounce,
  generateRandomString,
};
