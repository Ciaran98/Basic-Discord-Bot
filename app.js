// Require the Discord.js Module
const Discord = require('discord.js');

// Create a new Discord Client
const client = new Discord.Client();

// Configuration file
const {prefix, token, bungie, tracker, welcomeChannelId} = require('./config.json');

// Node package for fetch commands
const fetch = require('node-fetch');

// Query String module
const querystring = require('querystring');

// Shows the bot is ready and online
client.once('ready', () => {
	console.log('Ready!');
});
// Function to handle user messages
client.on('message', async message=>{
    
	// If the message sent does not start with a prefix or if the author is a bot, exit early
	if(!message.content.startsWith(prefix)||message.author.bot) return;
	const args = message.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase();
   // Switch Statements for chat commands
   switch(command) {
   		// Switch case #1 - Simple Greeting
        case `hello`:
        	message.channel.send(`Hi`);
        	break;
        // Switch case #2 - Random fact accessed through an API
        case `random`:
        	const {text} = await fetch(`https://uselessfacts.jsph.pl/random.json?language=en`).then(response => response.json());
        	message.channel.send(text);
        break;
        /* Switch case #3 - XKCD comic Strip through XKCD API
        Checks to see if an argument is given, and also checks if it is a number,
        if not it is ignored and instead returns the latest comic strip,
        if argument is valid, access the comic of the given argument number*/
        case `xkcd`:
        	if(!args.length || isNaN(args)){
        		const {img} = await fetch(`https://xkcd.com/info.0.json`).then(response => response.json());
        		message.channel.send(`Here is the latest XKCD comic: ${img}`);
       		}
        	else{
        		const {img} = await fetch(`https://xkcd.com/${args}/info.0.json`).then(response => response.json());
        		message.channel.send(`Here is XKCD comic #${args}: ${img}`);
        	}
        break;
        // Switch case #3 - Access an API that sends back a random picture of a cat
        case `cat`:
        	const {file} = await fetch(`https://aws.random.cat/meow`).then(response => response.json());
        	message.channel.send(file);
        break;
        // Switch case #4 - Access the Bungie API to get information from Destiny 2
        case `d2`:
        	// The header sent to the API must include your API key, not including this will result in no data being pulled from the servers
        	const bngHeader = {
        		"X-API-Key" : bungie
        	}
        	const bngResponse = await fetch(`https://www.bungie.net/platform/Destiny2/1/Profile/4611686018432863314/Character/2305843009284797144/?components=100,200,201`,{headers:bngHeader});
        	const bngJson = await bngResponse.json();
        	message.channel.send(bngJson.Response.character.data.emblemPath);
        break;
        // Switch case # 5 - Delete a specified number of messages
        case `clear`:
        	if(!args) return message.reply(`You need to specify an amount of messages you wish to delete`);
        	if(isNaN(args)) return message.reply(`You have not specified a number`);
        	if(args > 100) return message.reply(`You cannot delete ${args} messages,  you cannot delete more than 100 messages`);
        	if(args < 1) return message.reply(`You cannot delete ${args} messages, you must specify a number higher than 1`);
        	
        	await message.channel.messages.fetch({ limit: args }).then(messages => {
    			message.channel.bulkDelete(messages)})
        break;

        /* Switch case #6 - Access the Tracker Network API to access stats from various video games,
        the one used in this statement is Apex Legends
        */
        
        case `apex`:
        	// The header sent to the API must include your API key, not including this will result in no data being pulled from the servers
        	const trnHeader = {
        		"TRN-Api-Key" : tracker
        	}
        	// Statements to make sure a valid search is being made
        	if(!args || args.length <= 1) return message.reply(`You must include search terms in this format: !apex [Your platform] [Your username]`);
        	if(!(args[0].valueOf() == "xbl" || args[0].valueOf() == "psn" || args[0].valueOf() == "origin")) return message.reply(`You must include your platform as the first term in your query`);
        	const trnUrlSpace = "%20";
        	var urlSearch = "";
        	var trnUrl = `https://public-api.tracker.gg/v2/apex/standard/profile/${args[0]}/`;
        	for (var i = 1; i < args.length-1; i++) {
        		urlSearch = urlSearch + args[i].concat(trnUrlThing);
        	}
        	urlSearch = urlSearch + args[args.length - 1];
        	trnUrl = trnUrl.concat(urlSearch);
        	const trnResponse = await fetch(trnUrl,{headers:trnHeader});
        	const trnJson = await trnResponse.json();
        	message.channel.send(`Level: ${trnJson.data.segments[0].stats.level.value}`);
        break;





        case `tictactoe`:
            message.channel.send(`Game of TicTacToe`);
        ;




        case `rockpaperscissors`:
            var rpsRand = Math.floor(Math.random()* 3);
            var rps;
            if(rpsRand == 0){
                rps = "Rock";
            }
            else if(rpsRand == 1){
                rps = "Paper";
            }
            else if(rpsRand == 2){
                rps = "Scissors";
            }
            message.channel.send(`Player chose: ${args}, Bot chose: ` + rps);
            message.channel.send(rockpaperscissors(args.toString().toLowerCase(), rps.toString().toLowerCase()));
        break;
    }
});

// Play a simple game of TicTacToe
function tictactoe(){
    message.channel.send(`          |           |           `);
    message.channel.send(`          |           |           `);
    message.channel.send(`          |           |           `);


}


// Play a simple game of Rock Paper Scissors
function rockpaperscissors(userRps,cpuRps){
    var result;
    if(userRps == cpuRps){
        result = "Tie Game";
    }
    else if(userRps == `rock`){
        if(cpuRps == `paper`){
            result = "Bot Wins";
        }
        else{
            result = "Player Wins";
        }
    }
    else if(userRps == `paper`){
        if(cpuRps == `rock`){
            result = "Player Wins";
        }
        else{
            result = "Bot Wins";
        }
    }
    else if(userRps == `scissors`){
        if(cpuRps == `rock`){
            result = "Bot Wins";
        }
        else{
            result = "Player Wins";
        }
    }
    else{
        result = "Unable to determine winner - Incorrect input."
    }
return result;
}


/*	
	Code to be executed when a new person joins the server
	Add 50/50 join or get kicked.
	
*/
client.on('guildMemberAdd', guildMemberAdd =>{
	const generalChannel = client.channels.cache.get(welcomeChannelId);
	console.log("Toads");
	generalChannel.send(`Hello there!`);
});
// Uses the login token from the configuration file
client.login(token);