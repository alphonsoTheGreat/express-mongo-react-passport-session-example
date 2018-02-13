# express-mongo-react-passport-session-example
this is an example of end to end app with user authentication combining express-mongo-react.

to get things running : 
clone the repo
npm install
mongo running on port 27017 (default)
  mongo database: 
    database name: rapid
      collections names: AppUsers (hold all users info)
                         thumbnail (holds each user thumbnail data)

run server - go to ./server npm run devstart
run client - go to ./client/rapid-client npm run start

NOTE:
you'll have to create the db and collections
