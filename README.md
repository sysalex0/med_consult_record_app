# med_consult_record_app

Steps to run this project:

1. Setup postgres database locally
    1. Download and install postgres https://www.postgresql.org/download/
    2. Set the super user password when install, please remember the password
    3. Add the postgres bin directory as path environment variable (Windows)
    4. User the super user 'postgres' to create database called 'testdb'
        - Use the command: `createdb -U postgres testdb`
      
2. Install backend
    1. Run `npm i` for backend-ct
    2. Run database migration to create table to 'testdb'  
        - use the command: `knex migrate:latest`
    3. Run `npm start`
3. Install frontend
    1. Run `npm i` for frontend-ct
    2. Run `npm start`
    3. Scan the QR code prompt with your phone by Expo App

- Closure:
    - I cannot finish the agenda view of consultation records as I found the wrong library and finally running out of time. Sorry for the inconvenience caused.
