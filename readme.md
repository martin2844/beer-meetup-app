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

# Backend Endpoints: 

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

# Front End in React:
The front end is basically a quick and raw Create React App.

If features:
* Global Context using useContext hook.
* Protected Front End Routes
* Creation of meetups if user is Admin
* Login and Logging out
* Registration of users
* Notifications being sent to every user every time a meetup is created.
* Use Effect and UseState Hooks 
* Basic usage of reactstrap
* If user is admin, he can quickly check the amount of beer needed for a meetup based on attendees and weather
* Conditional Rendering


# How to deploy:
### Production Enviroment

1. Create a new VPS
2. Install nodeJS
`curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`
Then
`sudo apt-get install -y nodejs`
Check with `node -v`
3. Install NGINX 
``` 
sudo apt update
sudo apt install nginx
```
4. Allow corresponding calls via PORTS:
```
sudo ufw allow 'NGINX HTTP'
sudo ufw allow 'NGINX HTTPS'
sudo ufw allow 22
sudo ufw enable
```
5. Once this is done, going to the server's IP address should reveal the corresponding NGINX landing page.
6. Install MongoDB - `sudo apt install -y mongodb`
7. Check mongo's status by `sudo systemctl status mongodb`
8. Create the data folder for mongo DB `sudo mkdir -p /data/db`
9.  The Database is active and working, you can connect a GUI from your desktop in order to easily visualize the Data
    1.  Download Robo3T
    2.  Create a new connection on Connection Panel the information needed is the following:
        1.  Name: "Name"
        2.  Adress: 127.0.0.1 : 27017
    3.  On the SSH panel you'll put
        1.  Use SSH Tunnel Active
        2.  SSH address, the VPS adress
        3.  SSH Username
        4.  SSH Password
    4.  Click TEST, should return a successful test. You should connect fine.
10. Install Redis:
    1.  ```
        sudo apt update
        sudo apt install redis-server   
        sudo systemctl status redis-server
        ```
11. Cd into /var/www/ and clone the repo here. I clone it with a TOKEN created from the settings in gitlab.
    1.  git clone via https
    2.  When prompted for user, put your gitlab user or github user, and then your password or token
        1.  If you want to store your git user and password for future git manipulations do the following:
        ```
        $ git config credential.helper store
        $ git push http://example.com/repo.git
        Username: <type your username>
        Password: <type your password>
        ```
12. Cd into repository and run npm i.
13. Install pm2 `sudo npm i -g pm2`
14. Start your server `sudo pm2 start node app.js`
15. Configure NGINX -
    1.  Unlink the default config `sudo unlink /etc/nginx/sites-enabled/default`
    2.  Create new config `sudo vim reverse-proxy.conf`
        1.  Put the following: 
        ```
        server {
        listen 80;
        listen [::]:80;
        server_name yourdomainname
        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
                    proxy_pass http://localhost:5069/;
           }
        }

    3.  "Copy the configuration from /etc/nginx/sites-available to /etc/nginx/sites-enabled. It is recommended to use a symbolic link."
    4.  `sudo ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf`
    5.  Restart nginx 
    6.  `sudo systemctl stop nginx`
    7.  `sudo ssystemctl start gninx`
16. Deployment should be done, you should see the server runnign at yourdomain. Now we need to install SSL
    1.  add certbox `sudo add-apt-repository ppa:certbot/certbot`
    2.  `sudo apt update`
    3.  `sudo apt install python-certbot-nginx`
    4.  `sudo certbot --nginx -d example.com -d www.example.com`




