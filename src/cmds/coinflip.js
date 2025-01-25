import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import { createMsg, createRow } from '../builder.js'


export default { 
	name: "coinflip",
	desc: "Flip a coin!",

	async execute(interaction) {
		const rNum = Math.random() < 0.5 ? 1 : 2;
		const coinFace = rNum === 1 ? 'Heads' : 'Tails'
		
		const row = createRow([
			{ id: 'heads', label: 'Heads', style: 'Green' },
			{ id: 'tails', label: 'Tails', style: 'Red' }
		])

		var response = await interaction.reply({ embeds: [createMsg({ title: 'Coin Flip', desc: 'Heads or Tails?' })], components: [row], withResponse: true })

		let choice = ""

		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000});

			if (confirmation.customId === "heads") {
				choice = 1
			}
			else if (confirmation.customId === "tails") {
				choice = 2
			}
			
			if (rNum === 1) {
				if (choice === 1) {
					await interaction.editReply({ embeds: [createMsg({ title: 'You Win!', desc: `Your coin landed on **${coinFace}**!` }) ], components: [] })
				}
				else {
					await interaction.editReply({ embeds: [createMsg({ title: 'You Lose!', desc: `Your coin landed on **${coinFace}**!` }) ], components: [] })
				}
			} else if (rNum === 2) {
				if (choice === 2) {
					await interaction.editReply({ embeds: [createMsg({ title: 'You Win!', desc: `Your coin landed on **${coinFace}**!` }) ], components: [] })
				}
				else {
					await interaction.editReply({ embeds: [createMsg({ title: 'You Lose!', desc: `Your coin landed on **${coinFace}**!` }) ], components: [] })
				}
			}
		} catch (e) {
			await interaction.editReply({ content: '**You didn\'t pick a side :(**', components: [], embeds: [] });
		}
	}

}
