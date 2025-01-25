import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import { createMsg, createCmd } from './builder.js';
import config from '../token.json' with { type: 'json' };
import fs from 'fs';

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
		const slashDir = fs.readdirSync('./src/cmds').filter((file) => file.endsWith('.js'));
		const slashCommands = [];
		for (const slashFile of slashDir) {
			const slashCommand = (await import(`./cmds/${slashFile}`)).default;
			const slashCmd = createCmd(slashCommand);
			this.client.sc.set(slashCmd.data.name, slashCmd);
			slashCommands.push(slashCmd.data.toJSON());
		}

		const rest = new REST({ version: '10' }).setToken(config.token);
		await rest.put(
			Routes.applicationCommands(
				Buffer.from(config.token.split('.')[0], 'base64').toString('ascii')
			),
			{ body: slashCommands }
		);
	}

	async initEvents() {
		const eFiles = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'));
		for (const file of eFiles) {
			const event = (await import(`./events/${file}`)).default;
			this.client.on(event.name, (...args) => event.execute(...args));
		}
	}

	async login() {
		await this.client.login(config.token);
		this.client.on('ready', async () => {
			console.log('Coin Flip Bot is online!');
			const channel = this.client.channels.cache.get('1329637077339603059');
			channel.send({ embeds: [createMsg({ desc: '**Bot is online!**' })] });
		});
	}
}

export default DC;
