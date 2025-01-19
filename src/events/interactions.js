const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction) {
		log(interaction);
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.slashCommands.get(interaction.commandName);
			await command.execute(interaction);
			
		}
	}
}