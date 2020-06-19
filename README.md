# Trippy
## Amita, Hanna, Medyen, Richard

### Installation

#### To run the app:

- download repo
- in the root directory install the virtual env of your choice (pipenv or venv) and all the packages, e.g.:
    - pip install pipenv
    - pipenv shell
    - pipenv install
- navigate into /frontend directory
    - npm install
- setup the database (download sqlite)
    - navigate into /frontend/api 
    - start python interactive environment (command: 'python')
    - 'from app import db'
    - 'db.create_all()'
    - 'exit()'
- run servers:
    - concurrenly:
        - go into /frontend
        - npm start 
    - seperately:
        - in /frontend: npm run frontend
        - in /frontend/api: flask run

### About Trippy

Trippy is a social media app focused on people's travels. It displays a map of countries you've visited and let's you add photos and memories from your holiday trips. It keeps a score of how many countries you've been to. You can view other users' profiles and posts on a global timeline featuring updates from users that you have 'followed'. 
Built using Flask, React, SQLite3.

### User Stories
- I want to be able to securely create an account and login.
- I want to be able to edit my email/password.
- I want to be able edit my profile.
- I want to be able to add trips to my profile.
- I want to be able to view all the countries I've been to on the map.
- I would like to view the images I've uploaded in a gallery.
- I want to be able to see people's trip updates on a feed.
- I want to be able to look at other people's profiles.
- I would like to permanently delete my profile 



### Technology

## Front-end
- React JS (& Hooks)
- Bootstrap
- amcharts 4 

## Back-end
- Python (Flask framework)

## Database 
- Sqlite3

## Testing

### Frontend - 55% coverage
- Enzyme 
- Jest 

#### How to run tests and get coverage?
- pull the repo
- checkout into test-branch
- install all the dependencies (see above - installation)
- go into frontend/src/
- npm test -- --coverage --watchAll=false - runs all the tests and displays coverage

### Backend - 60% coverage
- Unittest
- Nose 2

#### How to run tests and get coverage?
- to into either branch
- install dependencies
- go into frontend/api/tests 
- run nose2





## Challenges
- Authentication for signing up and logging in 
- Utilising token authentication for users when logged in
- Uploading images through the frontend and storing them in the database
- Retrieving images from the database to show in the ‘Gallery’ tab
- Retrieving the information needed for the ‘Global Feed’
- Viewing other user profiles
- Testing (both frontend and backend)!


## Further Iterations

### Functionality
- Add ‘Following’ functionality
- Give users the ability to follow other users, and give the option filter their timeline to only people that they follow.
- Add ‘Search’ functionality
- Give users the ability to search for other users, and search for specific countries to filter their feed.

### Further Iterations
#### FUNCTIONS
- Add ‘Following’ functionality
- Give users the ability to follow other users, and give the option filter their timeline to only people that they follow.
- Add ‘Search’ functionality
- Give users the ability to search for other users, and search for specific countries to filter their feed.
- Add functionality to upload multiple photos per trip
- So far users are only able to add a single image per trip.
- Increase authorization security
- Currently the access tokens are only used for logging in, and allowing you to access your own profile to make changes. We’d like to add token authentication to all requests to the server.
- Add further error handling on the backend
- Test coverage at 90%+




