const fetch = require('node-fetch');
module.exports ={
	name: 'fact',
	description: 'Gives a random fact',
	args: false,
	execute: async(message, args) =>{
		const {text} = await fetch(`https://uselessfacts.jsph.pl/random.json?language=en`).then(response => response.json());
        	message.channel.send(text);
	}
};