const splitEscapedComma = (line) => {
  return line
    .split(/(?<!\\),/)
    .map((value) => value.replace(/\\,/g, ",").trim());
};

export const csvToJSON = (filename, contents) => {
  // Parse CSV contents and convert to JSON
  const lines = contents.trim().split("\n");
  const headers = splitEscapedComma(lines[0]);

  const data = lines.slice(1).map((line) => {
    const values = splitEscapedComma(line);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });

  const objectName = filename.split(".")[0]; // Use filename without extension as object name

  const fileData = {
    objectName,
    headers,
    data,
  };
  return fileData;
};

export default csvToJSON;
