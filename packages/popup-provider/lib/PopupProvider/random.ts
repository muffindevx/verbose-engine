const RandomNumber = {
  generateRandomString: (length = 32) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    let result = '';
    const arrayBuffer = new Uint8Array(length);
    crypto.getRandomValues(arrayBuffer);

    for (let i = 0; i < length; i++) {
      // @ts-ignore
      result += charset.charAt(arrayBuffer[i] % charset.length);
    }

    return result;
  },
};

export default RandomNumber;
