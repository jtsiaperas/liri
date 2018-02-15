README:

To start, run npm install and init

packages needed if you want to install manually: 
twitter, node-spotify-api, require, request, dotenv

you will need to substitute your own api keys for twitter and spotify. create your own .env file following this format:

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret


additionally, make sure you update the user_id in getTweets()

program runs as follows:

node liri [command] [input]

possible commands:

spotify-this-song - retrieves information from spotify based on input, defaults to The Sign

movie-this - retrieves information from imdb based on input, defaults to Mr. Nobody

do-what-it-says - reads random.txt and runs command and input

my-tweets - loads past 20 tweets for your user and when they were created

if you do not enter one of these commands, nothing will happen.