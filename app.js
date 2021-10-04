// Require the Discord.js Module
const Discord = require('discord.js');
const fs = require('fs');

// Create a new Discord Client
const client = new Discord.Client();


client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Configuration file
const {prefix, token, bungie, tracker, welcomeChannelId} = require('./config.json');



// Query String module
const querystring = require('querystring');

// Shows the bot is ready and online
client.once('ready', () => {
	console.log('Ready!');
});



client.login(token);
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Function to handle user messages.
client.on('message', async message=>{
    
    // If the message sent does not start with a prefix or if the author is a bot, exit early
    if(!message.content.startsWith(prefix)||message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    command.args;
    if(command.args&& !args.length){
            return message.channel.send(`You have not provided any arguments, ${message.author}`);
        }
    try{
        command.execute(message, args);
    }catch(error){
        console.error(error);
        message.reply('There was an issue executing the command!');
    }
});

client.on('guildMemberAdd', guildMemberAdd =>{
	const generalChannel = client.channels.cache.get(welcomeChannelId);
	generalChannel.send(`Hello there!`);
});
// Uses the login token from the configuration file
