# Jukely Checker

This is a NodeJS app to check and book your interested events. 

Steps to get it running

## Step 1
Make sure you have nodeJS and npm installed on your machine (https://nodejs.org/en/download/) 
If you're not sure, open up your terminal or commandline and run.. 'npm -v' ... 'node -v'

```
MM-Mac-3184:jukely-checker couyang$ npm -v
2.14.7
```

```
MM-Mac-3184:jukely-checker couyang$ node -v
v4.2.3
```

## Step 2
Download this repo or fork it (Whatever you want... Just somehow get the files)

## Step 3
Using terminal or commandline, navigate to the directory and run.. 'npm install'

```
MM-Mac-3184:jukely-checker couyang$ npm install 
npm WARN package.json Jukely-Checker@ No repository field. 
npm WARN package.json Jukely-Checker@ No README data 
moment@2.11.1 node_modules/moment 
```

## Step 4
Open up app.js file with your favorite editor and make some required changes.
```
var facebookEmail = "";         //your facebook e-mail here
var facebookPassword = "";      //your facebook password
```
Those two lines above, enter your email and password for Facebook. Here's an example below
```
var facebookEmail = "mrupsman@southpark.com";         //your facebook e-mail here
var facebookPassword = "hellothere";      //your facebook password
```

Add events that you're interested in (Must have at least 1 to work).
```
var interestedEvents = [{
    headlinerName: "",
    venue: ""
}];
```
Example below... 
```
var interestedEvents = [{
    headlinerName: "R3hab",
    venue: "Pacha"
},{
    headlinerName: "Chris Liebing",
    venue: "Pacha"
},{
    headlinerName: "Mr UPS Man",
    venue: "Terminal 5"
}];
```
Some sample venues...
```
Space Ibiza NY
Verboten
Cielo
Output
Marquee
```

## Step 5
Using terminal or commandline, navigate to the directory and run.. 'node app.js'
```
MM-Mac-3184:jukely-checker couyang$ node app.js
Logging into Facebook.
Received facebook login token... Logging into Jukely now!
Logging into Jukely.
Received jukely login token... Checking for Jukely shows!!
Checking for open events now...
Get list of events finished...
Event list length: 84

Here are the interested events that are matched...

Event title: Chris Liebing
Event time: January 16th 2016, 10:30:00 pm
Headliner: Chris Liebing
Venue: Pacha
City: New York
Status: Closed


Fuck event is closed :(... Trying again in 30 seconds
```

## Trouble Shooting
Make sure your Facebook credentials are correct. Follow the console to see where it's going wrong. 
