const fs = require('fs');
const path = require('path');


fs.access(path.join(__dirname, 'project-dist'), fs.constants.F_OK, (err) => {
  if (err){
    fs.mkdir(path.join(__dirname, 'project-dist') , err => {
      if(err) throw err; 
      else{create()}
  });
    
  }
  else {
    fs.rm(path.join(__dirname, 'project-dist', 'index.html'), err => {
      if(err) throw err; 
   });
    fs.rm(path.join(__dirname, 'project-dist', 'style.css'), err => {
    if(err) throw err; 
   })
    fs.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force: true}, err => {
      if(err) throw err; 
      else{
        create()
      }
   });
  }
})


function create(){
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist','index.html'));
  const outStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  let streamTemp = fs.createReadStream(path.join(__dirname, 'template.html'),'utf-8');
  let template = '';
  streamTemp.on('data', chunk => template += chunk);
  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err) throw err
    else {
      let i = 0;
      files.forEach(file => {
        let stream = fs.createReadStream(path.join(__dirname, 'components', file.name),'utf-8');
        let arr = file.name.split('.');
        let name = arr[0];
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
          template = template.replace(`{{${name}}}`, data);
          i++
          if(i==files.length) output.write(template);
        });
      })
    }
  });

  
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

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
      if(err) throw err
  })
  
  fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
    if (err) throw err
    else {
      files.forEach(file => {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), err => {
                if(err) throw err; 
             });
             fs.readdir(path.join(__dirname, 'assets', file.name), { withFileTypes: true }, (err, docs) => {
              if (err) throw err
              else {
                docs.forEach(doc => {
                    fs.copyFile(path.join(__dirname, 'assets', file.name, doc.name),path.join(__dirname, 'project-dist', 'assets', file.name, doc.name), err => {
                      if(err) throw err
                  })
                })
              }
            })
        }
      )
    }
  })
}


