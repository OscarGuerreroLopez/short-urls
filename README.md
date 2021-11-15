# Short URL test

## Description:

Back end solution for the short url test.

It is composed of two routes.

### Add URL and get short url

this route registers a new url and returns the short url and also the number of visits in case that it was added before. If exists we don't add it, we just return the short url
the request looks like:

```bash
curl --location --request POST 'http://localhost:5001' \
--header 'Content-Type: application/json' \
--data-raw '{
    "longUrl": "https://github.com/OscarGuerreroLopez/short-urls"
}'

```

### Get the long URL based on a shorted url

this route takes a short url and returns the long url and the number of visits, then the front could use that info to redirect or get the number of visits for that short url

```bash
curl --location --request GET 'http://localhost:5001/N2gvw20F7'

```

### Run local

Clone it, create a .env file folowing the .example.env, npm install and:

```bash
npm run start:tsnode
npm start
```

# Structure:

The application is fairly simple. My intention is to have a little node app that can scale pretty easy by adding new functionalities. Can be used as a monolith or micro service with http.

I use express with typescript as the framework since I am more familiar to that approach, but I have used other frameworks as well and plain node

### Main index

The project structure is quite simple. I have a main index file where I inject the routes and middleware to be used application wide. Helmet is used for security, I also apply a logger middleware that will register each request and log it with a unique id in case we through an error we can find out what the request was.

At the end we catch any error not handled by the rest of the application, like that the application will not stall unless we want to.

Logging is done into a file but the ideal scenario would be to log it to elastic search for example to be used with kibana….. we have the usual logs, info, warn and error

### http and infra

http folder. In this folder we have the routes, handlers (controllers) and middleware. I like to keep all of that separate in case that a change in framework is required
The routes are used to inject specific middleware related to the route and finally redirect the request to the right handler.
The middleware folder contains specific middleware to be injected into a specific route

Then, we have the handlers, those are the ones that receive the express requests and and call the right service to handle the requests. Also, there is a try catch on each handler, so any errors that happen below will be catch there. That’s why you will not see many try and catches in the services, cause the intention is to catch them at the highest level and handle them

The infra folder is where we would have the abstractions for the DB for example. Is is done this way to abstract the DB methods, like that each service that needs to interact with the DB will not know where the data is coming from. I kind of fake a mongo DB in this project using underscore….. Like that you can test it without having to use a real DB

### use-cases

Here where we defined the business rules. This can be compare to the services in other frameworks or logic. Again, this is separated from the high level infra folder and from the entities used in the app. Can be reused independently of the framework.Here we also inject the external dependencies to the service using dependency inversion and injection.

### entities

Here we have the entities used in the app. Then we have a folder for each entity to apply the enterprise business rules, like how we want the data in the entity to be. Again this is separated also from the higher level use-cases.

### utils

Common functions for the rest of the app

### finally

I included some basic test with Jest here, again just for this test and the time I had I did not include a lot of tests, but just to show you that I know how to do it.
I think that is all, if you have any questions please contact me and I will try to answer them.
