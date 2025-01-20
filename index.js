const Discord = require('./src/discord.js');

async function start() {
  const discord = new Discord();
  await discord.init();
}

start();
