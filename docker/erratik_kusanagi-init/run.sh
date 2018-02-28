#!/bin/bash

set -m

mongodb_cmd="mongod --storageEngine $STORAGE_ENGINE"
cmd="$mongodb_cmd --httpinterface --rest --master --bind_ip=127.0.0.1,172.16.0.2"
if [ "$AUTH" == "yes" ]; then
    cmd="$cmd --auth"
fi

if [ "$JOURNALING" == "no" ]; then
    cmd="$cmd --nojournal"
fi

if [ "$OPLOG_SIZE" != "" ]; then
    cmd="$cmd --oplogSize $OPLOG_SIZE"
fi

$cmd &
echo $cmd
echo "- - - - - - - - - - - - - - - - - - - - - - - - - - - - -"
echo "+"
echo "+   [erratik/kusanagi-init]($1) image env vars:"
echo "+"
echo "+   MONGO_LOCAL_STORAGE=$MONGO_LOCAL_STORAGE"
echo "+   MONGODB_APPLICATION_DATABASE=$MONGODB_APPLICATION_DATABASE"
echo "+   MONGODB_APPLICATION_USER=$MONGODB_APPLICATION_USER"
echo "+   MONGODB_APPLICATION_PASS=$MONGODB_APPLICATION_PASS"
echo "---------------------------------------------------------"

if [ ! -f /data/db/.mongodb_password_set ]; then

    /set_mongodb_password.sh

fi

# if [ $MONGODB_APPLICATION_DATABASE != "admin" ]; then
echo "+   You can now connect to the ${MONGODB_APPLICATION_DATABASE:-"admin"} MongoDB server using:"
echo "+   "
echo "+       mongo ${MONGODB_APPLICATION_DATABASE:-"admin"} -u ${MONGODB_APPLICATION_USER:-"admin"} -p ${MONGODB_APPLICATION_PASS:-"4dmInP4ssw0rd"} --host <host> --port <port>"
echo "+   "
echo "+   "
echo "+   Please remember to change the admin password as soon as possible!"
echo "+   "
echo "+   - - - - - - - - - - - - - - - - - - - - - - - - - - - - -"

fg
