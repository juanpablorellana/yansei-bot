const Discord = require('discord.js')
module.exports = async (client) => {
  client.user.setPresence(
    {
      status: "online",
      activity: {
        name: "y.ayuda",
        type: "PLAYING"
      }
    }
  )
  console.log(`${client.user.username} Conectado!`);
}