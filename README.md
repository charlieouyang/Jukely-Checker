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
Open up Google Chrome and go to the Jukely website. Login using your Facebook. Then right click on the page and click on "Inspect Element". Then use the text search utility (Command F or Control F) to find two attributes: "_fb_uid" and "_fb_access_token". Here's a screenshot to show the 2 fields in Chrome.

![alt tag](https://github.com/charlieouyang/Jukely-Checker/blob/master/jukely-screenshot.png)

## Step 5
Open up app.js file with your favorite editor and copy and paste those two values into the file.
```
var facebookUserId = "";         //your facebook user id here
var facebookAccessToken = "";      //your facebook access token
```
Here's an example below
```
var facebookUserId = "501234795";         //It's usually 9 numbers 
var facebookAccessToken = "CAADoVON4jM0BAK0JhJZBQd4GCFpwp8aRhegtl2KRQmSKtz0Ymo38Wa7VvavBGap7YrZA5mWc2w9XmTOvwfTEaVwRIFGftfm29Yf4TfJEH0j6B3mrVTKsAx6bRszAASW2QEDaP7bFspiaXHz0I3exQmSNkWPcA3tr46gINvnvai5ZBJngT4POHcRo9h8XK0lnDYmHZCYfeEkHZA2dWWQXH";      //It's usually 214 characters
```

Values you can modify
These are default values. You can modify them as how you want. The wait time shouln't be too small as you don't want Jukely server to block your fb_id and access token thinking you're trying to DDOS them. The number of spots to book is either 1 or 2.
```
var waitTimeInBetween = 30;     //Number of seconds between Jukely event checks
var numberOfSpotsToBook = 1;   //Number of spots you want to book (default is 1)
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

## Step 6
Using terminal or commandline, navigate to the directory and run.. 'node app.js'. At first, it should print out all of the events that are available in the Jukely website. You can double check your selections based upon the output. If nothing is matched, you gotta check the event details you entered. Also, if the event isn't bookable yet on your app or the website, this program will fail.
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
