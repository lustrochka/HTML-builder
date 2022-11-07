const fs = require('fs');
const path = require('path');


fs.access(path.join(__dirname, 'files-copy'), fs.constants.F_OK, (err) => {
    if (err){
        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
            if(err) throw err; 
            else {copy()
            }
        });
        
    }
    else {
        fs.readdir(path.join(__dirname, 'files-copy'), { withFileTypes: true }, (err, files) => {
            if (err) throw err
            else {
              files.forEach(file => {
                if(file.isFile()){
                    fs.unlink(path.join(__dirname, 'files-copy', file.name), err => {
                        if(err) throw err; 
                     });
                } else {
                    fs.rmdir(path.join(__dirname, 'files-copy', file.name), err => {
                        if(err) throw err; 
                     });
                }
              });
              copy()
            }
          });
    }
  });

function copy(){
    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
        if (err) throw err
        else {
            files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'files', file.name),path.join(__dirname, 'files-copy', file.name), err => {
                    if(err) throw err
                })
            })
        }
      })
}
  

