# Meetups Challenge
The idea is to create a back end server that allows a user with an Admin role to create Meetups.
A meetup is a Database object that contains, a list of attendees, a list of people that can check in to show that they were there, the date of course, of said meetup.

With the date of the meetup we can get the forecast.
With the forecast and the amount of attendees we can calculate how many crates of beer we need to supply the meetup.

**Tech stuff:**  
Basically a REST API executed with NodeJS.  
User auth is done with Passport.js module.  
Database is done with MongoDB.  
Caching is done via Redis. We are caching mongoose operations by tapping into the mongoose exec function.     
We are caching the weather API as well. Cache lasts 5 minutes.  

# Endpoints: 

## Auth
### Login
**POST** - `/api/auth/login`    
Headers:  
Content-type: application/JSON  
``` 
Example JSON:
{
    "email": "test@test.com",
    "password": "123123"
}

```
### Register User
**POST** - `/api/auth/register`    
Headers:  
Content-type: application/JSON  
``` 
Example JSON:
{
    "email": "test@test.com",
    "password": "123123"
}

```

## Meetups

### Creates a new meetup
**POST** - `/api/meetup/create`    
*requires admin role*  
Headers:  
Content-type: application/JSON  
``` 
Example JSON:
{
    "name": "Far Meetup",
    "date": "30/11/2020 4:00:00"
}

```
### Deletes a meetup
**DELETE** - `/api/meetup/delete/:id`    
*requires admin role*  

### Registers user as attendee
**POST** - `/api/meetup/attend/:id`    

### Registers user as checked in to meetup
**POST** - `/api/meetup/checkin/:id`    

### Gets the amount of beer in crates for a meetup
**GET** - `/api/meetup/beerAmounts/:id`    
*requires admin role* 

### Checks the weather for a meetup
**GET** - `/api/meetup/checkWeather/:id`    

### Gets information from all Meetups
**GET** - `/api/meetup/getAll`




