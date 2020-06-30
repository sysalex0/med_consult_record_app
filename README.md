# med_consult_record_app

## Installation and run

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

## .env problem

#### For local testing, it is not needed unless we are doing in production. As your phone is not in localhost, so it is meaningless to set the environment variable for the BACK_END_API. It should refer to the local debugger host ip. Please refer to the /shared.js

## API

### For route http://localhost:3000/api/v1/auth/ 
I've done some validation but the error msg may not explain clearly, so I specify what I have checked if the error msg is not clear enough 

	POST http://localhost:3000/api/v1/auth/signup
	{
		"email": "ken@gmail.com", // email standard
		"password": "1234",  // at least 4 characters
		"clinic_name": "ken clinic", // at least one character
		"phone_number": "55555555", // follow HK phone tel standard
		"address": "5/F, APM, Kwun Tong" // at least one character
	}
	POST http://localhost:3000/api/v1/auth/signin
	{
		"email": "ken@gmail.com",
		"password": "1234"
	}

### For route http://localhost:3000/api/v1/consult_records/
	GET http://localhost:3000/api/v1/consult_records/
	GET http://localhost:3000/api/v1/consult_records/:userId
	POST http://localhost:3000/api/v1/consult_records/
	{
		"clinic_name": "test1 clinic", // this will be provided automatically in app referring to the login user
		"doctor_name": "Test doctor", // at least 1 characters
		"patient_name": "Test patient three", // at least 1 characters
		"diagnosis": "Home sick.", // at least 1 characters
		"medication": "Stay home", // at least 1 characters
		"consultation_fee": 100.5, // is number
		"follow_up": true // is boolean
	}
	
### For route http://localhost:3000/api/v1/users/
    GET http://localhost:3000/api/v1/users/:email
	GET http://localhost:3000/api/v1/users/:id
	GET http://localhost:3000/api/v1/users/

### Closure:
I cannot finish the agenda view of consultation records as I found the wrong library and finally running out of time. Sorry for the inconvenience caused.
