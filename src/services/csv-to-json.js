const splitEscapedComma = (line) => {
  return escapeQuotedCommas(line)
    .split(/(?<!\\),/)
    .map((value) => value.replace(/\\,/g, ",").trim());
};

const escapeQuotedCommas = (line) => {
  let output = "";
  // This is a simple state machine to escape commas that are inside quoted strings.
  // It handles both double and single quotes, and also allows for commas to be escaped with a backslash.
  let MODE = "NORMAL";
  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    switch (MODE) {
      case "NORMAL":
        if (c === '"') {
          MODE = "DBL_QUOTE";          
        } else if (c === "'") {
          MODE = "SGL_QUOTE";
        }
        break;
      case "DBL_QUOTE":
        if (c === '"') {
          MODE = "NORMAL";
        } else if (c === ",") {
          c = "\\,";
        }
        break;
      case "SGL_QUOTE":
        if (c === "'") {
          MODE = "NORMAL";
        } else if (c === ",") {
          c = "\\,";
        }
        break;
    }
    output += c;
  }
  return output;
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
