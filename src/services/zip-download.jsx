import streamSaver from "streamsaver"
import JSZip from "jszip";

function zipWithFolders(){
    const zip = new JSZip;
    zip.file("index.html", "hello, world!");
    zip.file("index.html", "<h1>hello, world!</h1>"); //can overwrite files
    const folder = zip.folder("foo_dir");
    folder.file("foo.txt", "I'm in a folder");
    zip.file("foo_dir/bar.txt", "I'm in a folder too");
    zip.file("bad_file", "ew, I shouldn't be here");
    zip.remove("bad_file");
    return(zip);
}

export async function saveZip(zip) {
    const writableStream = streamSaver.createWriteStream('my-Volery.zip');
    const writer =  writableStream.getWriter();
    zip.generateInternalStream({type:'uint8array'})
    .on('data', (data, metadata)=>{writer.write(data)})
    .on('end', ()=>{writer.close()})
    .resume(); //we registered the callbacks, now we start the stream
}

function DownloadButton(){
    const zip = zipWithFolders();

    return(
        <>
        <button onClick={()=>{saveZip(zip)}}>
            Download zip!
        </button>
        </>
    );
}

export {DownloadButton}