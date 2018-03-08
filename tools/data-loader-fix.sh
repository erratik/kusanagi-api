
#!/bin/bash

# echo  $( id -u node ):$( id -g node )
# chown -R node:node /usr/local/lib/node_modules;
DATALOADER=$?
eval ls /usr/src/app/node_modules/ -la | grep dataLoader-mongoose;
  while [ $DATALOADER -eq 0 ]; do
    DATALOADER=1;
    cd /usr/src/app/node_modules/dataloader-mongoose;
    npm run build:source;

    # babel --plugins transform-regenerator dist/dataLoaderMongoose.js;
    # cat dist/dataLoaderMongoose.js;
  done
exit;

