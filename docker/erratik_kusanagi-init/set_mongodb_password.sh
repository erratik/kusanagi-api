#!/bin/bash
COMMENT_LINE="- - - - - - - - - - - - - - - - - - - - - - - - - - - - -"

#Database persistance
MONGO_LOCAL_STORAGE=${MONGO_LOCAL_STORAGE:-"data/db"}

#Admin User
MONGODB_ADMIN_USER=${MONGODB_ADMIN_USER:-"admin"}
MONGODB_ADMIN_PASS=${MONGODB_ADMIN_PASS:-"4dmInP4ssw0rd"}

# # Application Database User
MONGODB_APPLICATION_DATABASE=${MONGODB_APPLICATION_DATABASE:-"admin"}
MONGODB_APPLICATION_USER=${MONGODB_APPLICATION_USER:-"erratik"}
MONGODB_APPLICATION_PASS=${MONGODB_APPLICATION_PASS:-"r3sT4pIp4ssw0rd"}

# Wait for MongoDB to boot
mongo admin --eval "help" >/dev/null 2>&1 # do a simple harmless command of some sort

RESULT=$?   # returns 0 if mongo eval succeeds
MONGO_ON=$?   # returns 0 if mongo eval succeeds

while [[ $RESULT -ne 0 ]]; do
  echo $COMMENT_LINE
  echo "🚫   mongodb not running"
  echo $COMMENT_LINE
  sleep 5


  mongo admin --eval "db.stats()"
  RES=$?; # returns 0 if mongo eval succeeds

  while [[ $RES -eq 0 ]]; do

    echo $COMMENT_LINE
    echo "🍃   mongodb running..."
    echo $COMMENT_LINE

    RESULT=$?;
    RES=1;
    sleep 10
    # Create the admin user

    MONGO_ADMIN_EXISTS=$?; # returns 0 if mongo eval succeeds
    echo "⏳  Creating admin user with a password in MongoDB "
    echo $COMMENT_LINE
    mongo admin --eval "rs.initiate();"
    mongo admin --eval "db.createUser({user: '$MONGODB_ADMIN_USER', pwd: '$MONGODB_ADMIN_PASS', roles:[{role:'root',db:'admin'}]});"

    #check if user was created
    while [[ $MONGO_ADMIN_EXISTS -eq 0 ]]; do

      echo "🤓  successfully created admin user admin db!"
      echo $COMMENT_LINE

      MONGO_ADMIN_EXISTS=1;

      # returns 0 if mongo eval succeeds
      # If we've defined the MONGODB_APPLICATION_DATABASE environment variable and it's a different database
      # than admin, then create the user for that database.
      # First it authenticates to Mongo using the admin user it created above.
      # Then it switches to the REST API database and runs the createUser command
      # to actually create the user and assign it to the database.
      if [ $MONGODB_APPLICATION_DATABASE != "admin" ]; then

        echo "⏳  Not using defaults when containerized, using cli params instead....."
        echo $COMMENT_LINE
        mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS << EOF
use $MONGODB_APPLICATION_DATABASE
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner', db:'$MONGODB_APPLICATION_DATABASE'}, {role:'dbOwner', db:'admin'}, {role:'restore', db:'admin'}]})
EOF

        APP_USER_EXISTS=$?;
        mongo datawhore -u $MONGODB_APPLICATION_USER -p $MONGODB_APPLICATION_PASS --eval "db.$MONGODB_APPLICATION_DATABASE.system.users.find({user: '$MONGODB_APPLICATION_USER'});"

        # If everything went well, add a file as a flag so we know in the future to not re-create the
        # users if we're recreating the container (provided we're using some persistent storage)
        while [[ $APP_USER_EXISTS -eq 0 ]]; do
          echo "🤩  successfully created ${MONGODB_APPLICATION_USER}/${MONGODB_APPLICATION_PASS} in ${MONGODB_APPLICATION_DATABASE} db!"
          echo $COMMENT_LINE
          exit;

          MONGO_HAS_DEFAULT_USER=$?;
          #check if user was created
          while [ $MONGO_HAS_DEFAULT_USER -ne 0 ]; do
            MONGO_HAS_DEFAULT_USER=1;


            echo "=> Done "
            touch /data/db/.mongodb_password_set

            echo "========================================================================"
            echo "You can now connect to the admin MongoDB server using:"
            echo ""
            echo "    mongo admin -u $MONGODB_APPLICATION_USER -p $MONGODB_APPLICATION_PASS --host <host> --port <port>"
            echo ""
            echo "========================================================================"
            exit;
          done

        done
      else

        echo "=> Done!"
        touch /data/db/.mongodb_password_set

        echo "========================================================================"
        echo "You can now connect to the admin MongoDB server using:"
        echo ""
        echo "    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS --host <host> --port <port>"
        echo ""
        echo "Please remember to change the admin password as soon as possible!"
        echo "========================================================================"
        exit;
      fi

    done

  done

done
