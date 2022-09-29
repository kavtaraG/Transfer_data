import fs from 'fs';
import path from 'path';
import { Readable, Writable, Transform } from 'stream';

const __dirname = path.resolve();

const inputFile = fs.createReadStream(`${__dirname}/input.txt`);

const writeInputFile = fs.createWriteStream(`${__dirname}/output.txt`);
const origin = Readable.from(inputFile);

//transform string to array
let myTransform = new Transform({
    transform(chunk, encoding, next){
        let data = chunk.toString('utf-8').split([]);
        console.log(data);

        next()
    }
});

//finishing transforming
myTransform.on('finish', () => {
    console.log('destinationArray -> ', myTransform);
  });

  //writing to the output file
origin
    .pipe(myTransform);
origin
    .pipe(writeInputFile);

    writeInputFile.on('data', (chunk) => {
    console.log(`logging ${chunk}`);
});



writeInputFile.on('end', () => {
    console.log('end');
});



