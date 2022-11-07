const fs = require('fs');
const path = require('path');
const outStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) throw err
    else {
      files.forEach(file => {
        if(file.isFile()){
            array = file.name.split('.');
            if(array[1]=='css'){
                let inStream = fs.createReadStream(path.join(__dirname, 'styles', file.name),'utf-8');
                inStream.pipe(outStream)
            }
        }
      })
    }
  });