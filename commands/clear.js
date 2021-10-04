module.exports = {
	name: 'clear',
	description: 'Clear a specified amount of messages',
	args: true,
	execute: async(message,args) =>{
		    if(isNaN(args)) return message.reply(`You have not specified a number`);
        	if(args > 100) return message.reply(`You cannot delete ${args} messages,  you cannot delete more than 100 messages`);
        	if(args < 1) return message.reply(`You cannot delete ${args} messages, you must specify a number higher than 1`);

        	await message.channel.messages.fetch({ limit: args }).then(messages => {
    			message.channel.bulkDelete(messages)})
	}
}