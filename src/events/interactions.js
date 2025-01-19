import { Events } from 'discord.js';

export default
{
	name: Events.InteractionCreate,

	async execute(interaction) {
		log(interaction);
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.slashCommands.get(interaction.commandName);
			await command.execute(interaction);
			
		}
	}
}