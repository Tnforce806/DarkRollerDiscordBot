module.exports = { 
	name: 'coinflip',
	desc: 'Flip a coin!',

	async execute(interaction) {
		console.log('asdf');
		const rNum = Math.random() < 0.5 ? 1 : 2;
		console.log(rNum);

		interaction.reply('e');
	}
 };
