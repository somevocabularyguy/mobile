const extractParts = (levelName: string) => {
  const match = levelName.match(/(\D+)(\d+)/);
  if (match) {
    const string = match[1];
    const number = parseInt(match[2], 10);
    return { string, number };
  }
  return { string: null, number: null };
};

const getObjectSize = (object: any) => {
  const objectString = JSON.stringify(object);
  let bytes =  new TextEncoder().encode(objectString).length; // Size in bytes

  const units = ['Bytes', 'KB', 'MB', 'GB'];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}

const areArraysEqual = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return false;
  return array1.every((value, index) => value === array2[index]);
};

export { extractParts, getObjectSize, areArraysEqual };