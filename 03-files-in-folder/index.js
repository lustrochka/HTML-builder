const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if (err) throw err
    else {
      files.forEach(file => {
        if(file.isFile()){
            fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
                if (err) throw err
                else {
                  array = file['name'].split('.');
                  console.log(`${array[0]} - ${array[1]} - ${stats['size']}b`)
              }
            }) 
        }
      })
    }
  })