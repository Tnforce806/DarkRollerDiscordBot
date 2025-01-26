import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import { createMsg, createRow } from '../builder.js'


export default { 
	name: "coinflip",
	desc: "Flip a coin!",

	async execute(interaction) {
		const rNum = Math.random() < 0.5 ? 1 : 2; 
		
		const Heads = new ButtonBuilder()
			.setCustomId('heads')
			.setLabel('Heads')
			.setStyle(ButtonStyle.Primary); //Use Emojis if possible

		const Tails = new ButtonBuilder()
		.setCustomId('tails')
		.setLabel('Tails')
		.setStyle(ButtonStyle.Primary); //Use Emojis if possible

		const row = new ActionRowBuilder()
    		.addComponents(Heads, Tails);

		var response = await interaction.reply({ embeds: [createMsg({ title: 'Coin Flip', desc: '@ Choose Heads or Tails.' })], components: [row], withResponse: true })

		// Data Collection 
		var choice = ""

		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000});

			if (confirmation.customId === "heads") {
				choice = "heads"
			}
			else if (confirmation.customId === "tails") {
				choice = "tails"
			}
			
			if (rNum === 1) {
				if (choice === "heads") {
					await interaction.deferReply();
					await interaction.editReply({ embeds: [createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**! You Win!` }) ], components: [] })
				}
				else {
					await interaction.deferReply();
					await interaction.editReply({ embeds: [createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**! You Lose!` }) ], components: [] })
				}
			} else if (rNum === 2) {
				if (choice === "tails") {
					await interaction.deferReply();
					await interaction.editReply({ embeds: [createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**! You Win!` }) ], components: [] })
				}
				else {
					await interaction.deferReply();
					await interaction.editReply({ embeds: [createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**! You Lose!` }) ], components: [] })
				}
			}
		} catch {
			await interaction.editReply({ content: 'Input not received within 1 minute, cancelling', components: [], embeds: [] });
		}
	}

}

//createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**!` }) 
// DW ABOUT THIS




