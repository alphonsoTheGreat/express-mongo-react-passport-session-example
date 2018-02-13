# express-mongo-react-passport-session-example
this is an example of end to end app with user authentication combining express-mongo-react.

to get things running : 
1) clone the repo
2) npm install
3) mongo running on port 27017 (default)
  3.1) mongo database: 
     3.1.1)database name: rapid
      3.1.2)collections 
              3.1.2.1)names: AppUsers (hold all users info)
              3.1.2.2)thumbnail (holds each user thumbnail data)

4)run server - go to ./server npm run devstart
5)run client - go to ./client/rapid-client npm run start

NOTE:
you'll have to create the db and collections
