

# kusanagi: MongoDB docker image
Docker image to run a [MongoDB]() database server storage based on [tutum/mongodb](https://store.docker.com/community/images/tutum/mongodb).

- adds an `admin` user in an `admin` database
- adds another repo user with privileges to all databases
- - if docker command without overriding `MONGODB_APPLICATION_USER`,  `repo_user` added to `admin` database
- - if docker command overrides `MONGODB_APPLICATION_DATABASE`, this database is created with `repo_user`


## Usage

To create the image:
`docker build -t erratik/kusanagi-mongo .`

To persist the data, export path on your machine:
`export MONGO_LOCAL_STORAGE=$PATH_TO_MONGO_LOCAL_STORAGE`

To create, execute the following command on image folder:

`docker run -it -e MONGO_LOCAL_STORAGE=$MONGO_LOCAL_STORAGE -e MONGODB_ADMIN_USER=admin -e MONGODB_ADMIN_PASS=4dmInP4ssw0rd -e MONGODB_APPLICATION_DATABASE=datawhore -e MONGODB_APPLICATION_USER=erratik -e MONGODB_APPLICATION_PASS=kaya80ate -p 27017:27017 -v $MONGO_LOCAL_STORAGE/tachikoma:/data/db erratik/kusanagi-mongo:latest`

### Commands
Load my app container , run init only, skip node/web stuff
`$ docker run -it --name logikawa -v /Users/erratik/Sites/datawhore/logikawa.v2/containers/erratik/kusanagi-init:/init erratik/kusanagi-init init`

Backup and restore scripts for mongo from prod to dev, backing up currents, etc
`$ docker container run -it --name restore.mongo -e MONGO_LOCAL_STORAGE=$MONGO_LOCAL_STORAGE -e MONGODB_APPLICATION_DATABASE=datawhore -e MONGODB_APPLICATION_USER=erratik -e MONGODB_APPLICATION_PASS=kaya80ate -v /Users/erratik/Sites/datawhore/logikawa.v2/containers/erratik_kusanagi-init:/init logikawa restore_mongo`

Bash into the restore.mongo, look for /init folder, should have eveything from the kusanagi-init img
`$ docker container run -it --name restore.mongo.bash.test -e MONGO_LOCAL_STORAGE=$MONGO_LOCAL_STORAGE -e MONGODB_APPLICATION_DATABASE=datawhore -e MONGODB_APPLICATION_USER=erratik -e MONGODB_APPLICATION_PASS=kaya80ate -v /Users/erratik/Sites/datawhore/logikawa.v2/containers/erratik_kusanagi-init:/init debian /bin/bash`

erratik$ docker container run -it --name restore.mongo.bash.test09 -e MONGO_LOCAL_STORAGE=$MONGO_LOCAL_STORAGE -e MONGODB_APPLICATION_DATABASE=datawhore -e MONGODB_APPLICATION_USER=erratik -e MONGODB_APPLICATION_PASS=kaya80ate -v /Users/erratik/Sites/datawhore/logikawa.v2/containers/erratik_kusanagi-init:/init
