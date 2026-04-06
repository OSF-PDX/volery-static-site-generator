export const csv2json = (filename, contents) => {
    console.log('Filename:', filename);
    console.log('Contents:', contents);
    // Parse CSV contents and convert to JSON
    const lines = contents.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
    
    const objectName = filename.split('.')[0]; // Use filename without extension as object name

    const fileData = {    
        objectName,    
        headers,
        data
    };
    return fileData;
}

/*
CsvFile class to encapsulate CSV file data and parsing logic

Example usage:
const csvContent = `name,age,city
Alice,30,New York
Bob,25,Los Angeles`;

const result = csv2json('people.csv', csvContent);
console.log(result);

Output:
{
  objectName: 'people',
  headers: ['name', 'age', 'city'],
  data: [
    { name: 'Alice', age: '30', city: 'New York' },
    { name: 'Bob', age: '25', city: 'Los Angeles' }
  ]
}
*/
export class CsvFile {
    constructor(filename, fileContents) {
        this.fileContents = fileContents;
        this.fileName = filename;
        const result = csv2json(filename, fileContents);
        this.objectName = result.objectName;
        this.headers = result.headers;
        this.parseData = result.data;
    }

    setFileContents(newContents) {
        this.fileContents = newContents;
        const result = csv2json(this.objectName, newContents);
        this.headers = result.headers;
        this.parseData = result.data;
    }
}

export default csv2json;