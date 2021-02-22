**Requirements**: node, docker.

##How to use

start the database:
`npm run start:db`

start the backend:
`npm run start:be`

start the frontend:
`npm run start:fe`

visit `localhost:4200`

I took the opportunity and tried out NestJS and TypeORM!

##Useful API EndPoints
The BE will listen on `localhost:3000`

Process the data from the csv file and store the results on the DB:
`GET localhost:3000/results/parse`

Get all results (processed data from the csv):
`GET localhost:3000/results`

Get results filtered by outcome:
`GET localhost:3000/results/filter/outcome/{ACCEPTED, REJECTED, CORRECTED}`

Get the validation outcome of a given number:
`GET localhost:3000/results/validate/:number`
