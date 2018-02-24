
require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var args = process.argv.slice(2);//0 and 1 are never used 
console.log(args);
var command = args[0];
var input ="";

for (i=1; i<args.length; i++)//creates string from arguments
{
    input+=args[i]+" ";
}

fs.appendFile("./log.txt",`\n${command} ${input}`,function(err){
   if (err) throw err;
});

function main(command,input){ //designed for recursion, specifically for do-what-it-says

    switch (command)//clearly organizes by command and what it does
    {

    case "my-tweets":
        getTweets();    
    break;

    case "spotify-this-song":
        if(input != "")
        {	
            spotifyThisSong(input);
        }
        else
        	spotifyThisSong();
    break;

    case "movie-this":
         if(input != "")
        {
            getMovie(input);
        }

        else
        	getMovie();
    break;

    case "do-what-it-says":
         fs.readFile('./random.txt', 'utf8', function read(err, data)
         {
         	var toDo = data.split(',');
            main(toDo[0],toDo[1]);
         });    
    break;

    }
}

function spotifyThisSong(title = "The Sign"){//defaults to The Sign if nothing entered
    spotify.search({type: 'track', query: title }, function(err, data) {
    
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var tracks = data.tracks.items;
        for (var i = 0; i<tracks.length; i++)
        {
            
            var track = tracks[i];
            var artist = track.album.artists[0].name;
            var song = track.name;
            var album = track.album.name;
            var url = track.preview_url;
            if (!url)
            {
                url= "Preview unavailable";
            }
            var result = `\nArtist: ${artist}\nSong: ${song}\nPreview: ${url}\nAlbum: ${album}`;
            console.log(result);
            fs.appendFile("./log.txt",result,function(err){//logs result
                if (err) throw err;
            });
        } 
    });
}

function getTweets(){
	var parameters = {
		user_id: "959873898824327168",
		count: 20
	};
    client.get("statuses/user_timeline",parameters, function(err, tweets, response){
        if (err) console.log(err);

        for (var i= 0; i<tweets.length; i++)
        {
            var created = tweets[i].created_at;
            var text = tweets[i].text;
            var result = `\n@3dMahmed: ${text} ${created}`;
            console.log(result);
            fs.appendFile("./log.txt",result,function(err){//logs result
                if (err) throw err;
            });

        }
    });
}

function getMovie(title = "Mr. Nobody"){
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function(error,response,body) {
        if(error) console.log(error)
           var name = JSON.parse(body).Title;
           var year = JSON.parse(body).Released;
           var plot = JSON.parse(body).Plot;
           var countries = JSON.parse(body).Country;
           var ratings = JSON.parse(body).Ratings;
           var actors = JSON.parse(body).Actors;
           var languages = JSON.parse(body).Language;
           var result = "";
           result += `\nTitle: ${name}\nReleased: ${year}`;
           for (var i = 0; i<ratings.length; i++)
           {
           	    var source = ratings[i].Source;
           	    if (source === "Internet Movie Database" || source === "Rotten Tomatoes")
           	    {
           	    	var rating = ratings[i].Value;
           	    	result+=`\n${source} rating: ${rating}`;
           	    }
            }
            result += `\nProduced in: ${countries}`;
            result += `\nLanguage: ${languages}`;
            result += `\nPlot: ${plot}`;
            result += `\nActors: ${actors}`;
            console.log(result);
            fs.appendFile("./log.txt",result,function(err){//logs result
                if (err) throw err;
            });
    });
}

main(command,input);//initial call of main so program actually runs