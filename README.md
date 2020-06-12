# Trippy
## Amita, Hanna, Medyen, Richard

### Installation

### About Trippy

Trippy is a social media app focused on people's travels. It displays a map of countries you've visited and let's you add photos and memories from your holiday trips. It keeps a score of how many countries you've been to. You can view other users' profiles and posts on a global timeline featuring updates from users that you have 'followed'. 
Built using Flask, React, SQLite3.



### User Stories

# As a user 
- you want to register and login to app that has authentication.
- you would like to post about your adventurious trip 
- you would like to add the trip destination
- you would like to post beautiful images of the trip
- you waould like to edit or delete the data based on your interest 
- you would like to change the account details , email and password
- you would like to permanently delete your profile 

### Technology

## Front-end
- React Js - Hooks
- Bootstrap
- armcharts 4 

## Back-end
- Python - flask 

## Database - Sqlite3

## Testing
### frontend
- Enzyme 
- Jest 

### backend 
- Unittest
- Nose 2

### Challenges & Solutions 
- making GET and POST requests work 
- making conurrenly 

### Further Iterations

## FUNCTIONS
- Add ‘Following’ functionality
- Give users the ability to follow other users, and give the option filter their timeline to only people that they follow.
- Add ‘Search’ functionality
- Give users the ability to search for other users, and search for specific countries to filter their feed.

## IMPROVEMENTS
- Add functionality to upload multiple photos per trip
- So far users are only able to add a single image per trip.
- Increase authorization security
- Currently the access tokens are only used for logging in, and allowing you to access your own profile to make changes. We’d like to add token authentication to all requests to the server.
- Add further error handling on the backend
- Error handling is mainly handled on the frontend, but this can be easily bypassed. We’d like to add further handling on the backend.
- Testing testing testing
- testing can always be improved
