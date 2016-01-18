//************************* Please fill out this section **************//
var facebookUserId = "501934795";
var facebookAccessToken = "CAADoVON4jM0BAK0JhJZBQd4GCFpwp8aRhegtl2KRQmSKtz0Ymo38Wa7VvavBGap7YrZA5mWc2w9XmTOvwfTEaVwRIFGftfm29Yf4TfJEH0j6B3mrVTKsAx6bRszAASW1QEDaP7bFspiaXHz0I3exQmSNkWPcA3tr46gINvnvai5ZBJngT4POHcRo9h8XK0lnDYmHZCYfeEkHZA2dWWQXH";
var waitTimeInBetween = 30;     //Number of seconds between Jukely event checks
/*
    Examples of venue names are... 
        Space Ibiza NY
        Verboten
        Cielo
        Output
        Marquee

    Each interested event needs a new set of {}
    Example is... 
        {
            headlinerName: "Above and Beyond",
            venue: "Terminal 5"
        }
*/
var interestedEvents = [{
    headlinerName: "R3hab",
    venue: "Pacha"
},{
    headlinerName: "Chris Liebing",
    venue: "Pacha"
}];
//********************************************************************//


//********** Don't touch! Unless you know what you're doing **********//
var facebookEmail = "";         //Doesn't work
var facebookPassword = "";      //Doesn't work
var jukelyAuthorizationToken = "";
var http = require('http');
var https = require('https');
var moment = require('moment');
var querystring = require('querystring');
var getOptions = {
    host: 'api.jukely.com',
    path: '/v5/metros/new-york/events?tier=unlimited',
    headers: {}
};
var postOptions = {
    host: 'api.jukely.com',
    path: '/v5/passes',
    headers: {},
    method: 'POST',

}

function checkingForOpenEvents(jukelyAccessToken) {
    if (jukelyAccessToken) {
        getOptions.headers["Authorization"] = "Bearer " + jukelyAccessToken;
        postOptions.headers["Authorization"] = "Bearer " + jukelyAccessToken;
    }

    console.log("Checking for open events now...");

    http.get(getOptions, function(response){
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var interested = [];
            var resp = JSON.parse(str);
            var events = resp.events;
            var anyOpen = false;
            var currentTime = moment();

            if (events) {
                console.log("Get list of events finished... ");
                console.log("Event list length: " + events.length);
                //Success! Go through events...
                for (var i=0; i<events.length; i++) {
                    var event = events[i];
                    var status = event.status === 2 ? "Open": "Closed";
                    var headliner = event.headliner;
                    var venue = event.venue;

                    for (var j=0; j<interestedEvents.length; j++) {
                        var interestedEvent = interestedEvents[j];
                        if (venue.name === interestedEvent.venue && headliner.name === interestedEvent.headlinerName) {
                            interested.push(event);
                        }
                    }
                }

                console.log("\nHere are the interested events that are matched... \n");
                for (var i=0; i<interested.length; i++) {
                    var event = interested[i];
                    var status = event.status === 2 ? "Open": "Closed";
                    var headliner = event.headliner;
                    var venue = event.venue;
                    var startDate = moment(event.starts_at);
                    var startDateTimeStr = startDate.format('MMMM Do YYYY, h:mm:ss a');

                    console.log("Event title: " + event.title);
                    console.log("Event time: " + startDateTimeStr);
                    console.log("Headliner: " + headliner.name);
                    console.log("Venue: " + venue.name);
                    console.log("City: " + venue.city);
                    console.log("Status: " + status);
                    console.log("\n");

                    if (status === "Open") {
                        anyOpen = true;
                    }
                }

                console.log("Checked at: " + currentTime.format('MMMM Do YYYY, h:mm:ss a'));
                console.log("\n");

                if (anyOpen) {
                    for (var i=0; i<interested.length; i++) {
                        var event = interested[i];
                        var status = event.status === 2 ? "Open": "Closed";
                        var headliner = event.headliner;
                        var venue = event.venue;

                        if (status === "Open") {
                            anyOpen = true;
                            console.log("BOOKING THE EVENT!");
                            bookEvent(event);
                            break;
                        }
                    }
                } else {
                    console.log("Fuck event is closed :(... Trying again in " + waitTimeInBetween + " seconds");
                    setTimeout(function(){ 
                        checkingForOpenEvents(); 
                    }, waitTimeInBetween * 1000);
                }
            } else {
                //Failed... Gotta login again
                console.log("Jukely Login token is stale... Gotta FB login and Jukely login again");
                //logIntoFacebook();
                logIntoJukely();
            }
        });
    }).on("error", function(e){
        console.log("Got error: " + e.message);
    });
}

function bookEvent(event) {
    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });
    }

    var post_data = querystring.stringify({
        "id": event.parse_id,
        "pass_count": 1
    });

    postOptions.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    postOptions.headers["Content-Length"] = Buffer.byteLength(post_data);

    console.log("Post Options... " + JSON.stringify(postOptions));
    console.log("Post Data... " + JSON.stringify(post_data));

    var req = http.request(postOptions, callback);
    //This is the data we are posting, it needs to be a string or a buffer
    req.write(post_data);
    req.end();
}


//Log into FB
function logIntoFacebook() {
    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var facebookResponse = JSON.parse(str);
            var jukelyAccessToken = facebookResponse.access_token;
            var userId = facebookResponse.uid;
            console.log("Received facebook login token... Logging into Jukely now!");
            logIntoJukely(jukelyAccessToken, userId);
        });
    }

    console.log("Logging into Facebook.");

    var facebookLoginOptions = {
        host: 'b-api.facebook.com',
        path: '/method/auth.login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-FB-Connection-Type': 'wifi.CTRadioAccessTechnologyLTE',
            'X-FB-SIM-HNI': '310260'
        },
        method: 'POST',
    }

    var post_data = querystring.stringify({
        credentials_type: "password",
        method: "auth.login",
        api_key: 6628568379,
        app_version: 18289579,
        sdk_version: 3,
        locale: "en_US",
        sdk: "ios",
        password: facebookPassword,
        fb_api_req_friendly_name: "auth_login",
        format: "json",
        generate_session_cookies: 1,
        error_detail_type: "button_with_disabled",
        device_id: "1FFB9AF3-2172-4249-8CDB-62EB0D9E03D7",
        sig: "b9811efee8abd14616bd56ddbd20217a",
        email: facebookEmail,
        machine_id: "yq4NVqIA80JIIrQhNa7R8ZlY",
    });

    facebookLoginOptions.headers["Content-Length"] = Buffer.byteLength(post_data);

    var req = https.request(facebookLoginOptions, callback);
    //This is the data we are posting, it needs to be a string or a buffer
    req.write(post_data);
    req.end();
}

//Log into Jukely with the facebook access token
function logIntoJukely() {
    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var jukelyLoginResponse = JSON.parse(str);
            var jukelyAccessToken = jukelyLoginResponse.access_token;
            console.log("Received jukely login token... Checking for Jukely shows!!");
            checkingForOpenEvents(jukelyAccessToken);
        });
    }

    console.log("Logging into Jukely.");

    var jukelyLoginOptions = {
        host: 'api.jukely.com',
        path: '/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    }

    var post_data = querystring.stringify({
        'facebook[user_id]': facebookUserId,
        'facebook[access_token]': facebookAccessToken,
        'grant_type': 'password'
    });

    jukelyLoginOptions.headers["Content-Length"] = Buffer.byteLength(post_data);

    var req = https.request(jukelyLoginOptions, callback);
    //This is the data we are posting, it needs to be a string or a buffer
    req.write(post_data);
    req.end();
}

//logIntoFacebook();
logIntoJukely();