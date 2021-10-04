const fetch = require('node-fetch');
module.exports ={
	name: 'comic',
	description: 'Gives a XKCD comic',
	args: false,
	execute: async(message, args) =>{
		    if(!args.length || isNaN(args)){
        		const {img} = await fetch(`https://xkcd.com/info.0.json`).then(response => response.json());
        		message.channel.send(`Here is the latest XKCD comic: ${img}`);
       		}
        	else{
        		const {img} = await fetch(`https://xkcd.com/${args}/info.0.json`).then(response => response.json());
        		message.channel.send(`Here is XKCD comic #${args}: ${img}`);
        	}
	}
};