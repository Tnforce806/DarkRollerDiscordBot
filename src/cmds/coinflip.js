export default { 
	name: "coinflip",
	desc: "Flip a coin!",

	async execute() {
		const rNum = Math.random() < 0.5 ? 1 : 2;
		console.log(rNum)
	}
 }