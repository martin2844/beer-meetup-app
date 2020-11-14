# Meetups Challenge
Rest API en Node para crear Meetups.

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
