# Trippy
## Amita, Hanna, Medyen, Richard

### Installation

### About Trippy

Trippy is a social media app focused on people's travels. It displays a map of countries you've visited and let's you add photos and memories from your holiday trips. It keeps a score of how many countries you've been to. You can view other users' profiles and posts on a global timeline featuring updates from users that you have 'followed'. 
Built using Flask, React, SQLite3.



### User Stories

# As a user 
- I want to register and login to app that has authentication.
- I would like to post about your adventurious trip 
- I would like to add the trip destination
- I would like to post beautiful images of the trip
- I would like to edit or delete the data based on your interest 
- I would like to change the account details , email and password
- I would like to permanently delete your profile 
- I would like to view the images I've uploaded in a gallery


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
### Frontend
- Enzyme 
- Jest 

### Backend 
- Unittest
- Nose 2

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

### Improvements
- Add functionality to upload multiple photos per trip
- So far users are only able to add a single image per trip.
- Increase authorization security
- Currently the access tokens are only used for logging in, and allowing you to access your own profile to make changes. We’d like to add token authentication to all requests to the server.
- Add further error handling on the backend
- Error handling is mainly handled on the frontend, but this can be easily bypassed. We’d like to add further handling on the backend.
- Testing testing testing
- Testing can always be improved
