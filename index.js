const Discord = require('./discord.js');

class Instance {
	constructor() {
		this.discord = new Discord();
	}
	
	async start() {
		await this.discord.init();
	}
}

const instance = new Instance();

instance.start();