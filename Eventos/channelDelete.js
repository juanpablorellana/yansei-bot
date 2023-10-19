const Discord = require("discord.js")
var tcd = []
module.exports = (client, channel) => {
  channel.guild.fetchAuditLogs().then(logs => {
    const raider = logs.entries.first().executor.id
    tcd.push(Date.now())
    let ms = tcd[tcd.length - 1] - tcd[tcd.length - 2]
    if (ms < 500) {
      channel.guild.members.ban(raider, { reason: "Bot Raider" }).catch(() => { })
    }
  })
}