export const csv2json = (filename, contents) => {
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

export default csv2json;