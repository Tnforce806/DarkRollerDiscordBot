const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			try {
				const command = interaction.client.sc.get(interaction.commandName);
				await command.execute(interaction);
			}
			catch (error) {
				console.log(error);
			}
		}
	}
};
