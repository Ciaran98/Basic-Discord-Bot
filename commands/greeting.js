module.exports = {
	name: 'hello',
	description: 'Hello Command',
	args: false,
	execute(message, args){
		message.channel.send('Hi!');
	}
};