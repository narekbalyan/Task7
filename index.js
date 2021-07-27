const path = require("path");
const zlib = require("zlib")
const fs = require("fs");

const argv = process.argv.slice(2);
const dirPath = argv[0];

function strGen(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let res = '';
    let charLength = chars.length;

    
    for (let i = 0; i < length; i++) {
        res += chars.charAt(Math.floor(Math.random() * 
      charLength));
   }

   return res;
}

const newDirPath = path.join(path.dirname(dirPath), strGen(5));

fs.readdir(argv[0], (err, data) => {
    if(err) {
        console.error(5);
    }

    fs.mkdir(newDirPath, (err) => {
        if(err) {
            console.error(5);
        }

        for (const i of data) {
            const inpStream = fs.createReadStream(path.join(dirPath, i));
            const outStream = fs.createWriteStream(path.join(newDirPath, `${i.split(".")[0]}.gz`));
            const gzip =  zlib.createGzip();

           inpStream.pipe(gzip).pipe(outStream);
        }
    });
});