const fetch = require('node-fetch');
module.exports ={
	name: 'cat',
	description: 'Gives a random cat picture',
	args: false,
	execute: async(message, args) =>{
		const {file} = await fetch(`https://aws.random.cat/meow`).then(response => response.json());
        	message.channel.send(file);
	}
};