# swe-project




how to setup project locally

- clone repo
- cd `frontend` dir
- npm i
- npm run dev

  **to view admin routes**
  http://localhost:5173/adminloginpage
  -     - username = admin
  -     - password = password
  http://localhost:5173/admindashboardpage
 -      - ban a user in database





how to setup backend 

Navigate to the Backend Directory:
- cd backend 
- npm i

Open database_setup.sql
- copy and paste into workbench to create schema, tables, and update admin table.

![image](https://github.com/fufupatwo/swe-project/assets/114861274/56b3310f-b457-4adb-9790-4d1a76bfebde)

![image](https://github.com/fufupatwo/swe-project/assets/114861274/82183159-8319-4089-a9f0-fe943d0ac15e)
![image](https://github.com/fufupatwo/swe-project/assets/114861274/c4eb59c1-ce55-4b92-8508-cc18e60ff455)



CREATE .env file under backend dir

```
DBHOST="127.0.0.1"
DBUSER="newuser"
DBPASSWORD="password1#"
DBNAME="swe_project"
DBPORT="3306"

PORT=4000
```

Run backend 
- nodemon server.mjs




