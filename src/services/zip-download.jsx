import streamSaver from "streamsaver"

export async function saveZip(zip) {
    const writableStream = streamSaver.createWriteStream('my-Volery.zip');
    const writer =  writableStream.getWriter();
    zip.generateInternalStream({type:'uint8array'})
    .on('data', (data, metadata)=>{writer.write(data)})
    .on('end', ()=>{writer.close()})
    .resume(); //we registered the callbacks, now we start the stream
}