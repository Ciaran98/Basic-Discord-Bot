module.exports = {
	name: 'binary',
	description: 'Translate Binary',
	args: true,
	execute: async(message,args) =>{
		var binToDec = [0];
		for (var i = 0; i < args.length; i++) {
			if(args[i].length !=8){
				var num = 8 - args[i].length;
				for(var k = 0; k < num; k++){
					args[i] = '0' + args[i];
				}
			}
			for(var j = 0; j < args[i].length; j++){
				if( j = 0){/*binToDec[i]=binToDec[i]+128*/message.channel.send("dork")}
			}

		}
		message.channel.send(args);
		message.channel.send(binToDec);
	}
}