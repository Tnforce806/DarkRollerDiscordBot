const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { createMsg, createCmd } = require('./builder.js');
const config = require('../token.json');
const fs = require('fs');

async function checkCmds(client)
{
	const commands = await client.application.commands.fetch();
	if (commands.size === 0) {
		console.log("Missing commands!")
		return;
	}
	commands.forEach(command => {
        console.log(`Name: ${command.name}`);
        console.log(`Description: ${command.description}`);
        console.log(`Options: ${JSON.stringify(command.options || [], null, 2)}`);
        console.log('-----------------------------');
    });
}

class DC {
	constructor() {
		this.client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent
			]
		});
		this.client.sc = new Collection();
	}

	async init() {
		await this.login();
		await this.initCmds();
		await this.initEvents();
	}

	async initCmds() {
		const slashDir = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
		const slashCommands = [];
		for (const slashFile of slashDir) {
			
			const slashCommand = (await import(`./cmds/${slashFile}`)).default;
			const slashCmd = createCmd(slashCommand);
			this.client.sc.set(slashCmd.data.name, slashCmd);
			slashCommands.push(slashCmd.data.toJSON());
		};

		const rest = new REST({ version: '10' }).setToken(config.token);
		
		await rest.put(Routes.applicationCommands(config.appID), { body: slashCommands });
	}

	async initEvents() {
		const eventDir = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
		for (const eventFile of eventDir) {
			const event = await import(`./events/${eventFile}`);
			this.client.on(event.name, (...args) => { 
				return event.execute(...args);
			});
		};
	}

	async login() {
		this.client.login(config.token);
		this.client.on('ready', async () => {
			console.log('Coin Flip Bot is online!');
			await checkCmds(this.client);
			const channel =this.client.channels.cache.get("1329637077339603059");
			channel.send({ embeds: [createMsg({ desc: '**Coinflip Bot is online!**' })] });
		});
	}
}

module.exports = DC;