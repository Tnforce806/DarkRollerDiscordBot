import { createMsg } from '../builder.js'

export default { 
	name: 'coinflip',
	desc: 'Flip a coin!',

	async execute(interaction) {
		const rNum = Math.random() < 0.5 ? 1 : 2;
		
		interaction.reply({ embeds: [createMsg({ title: 'Coin Flip', desc: `Your coin landed on **${rNum === 1 ? 'Heads' : 'Tails'}**!` })] })
	}
 };
