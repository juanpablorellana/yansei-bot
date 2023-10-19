const Discord = require('discord.js')
const { readdirSync } = require("fs")
const cooldown = new Set()
const canales = ["626588915771506690", "617163120430809110", "617177253985648640", "617177362945146951", "650358214243909652", "811396596670922782", "843598644430110740"]
module.exports = async (client, message) => {
  if (message.author.bot) return

  if (message.channel.id === '947357983162118155') {
    message.delete()
    if (message.content === 'hholaj') {
      message.guild.members.cache.get('753600264740536330').roles.add('947358878956388403')
    } else if (message.content === 'salir') {
      message.guild.members.cache.get('753600264740536330').roles.remove('947358878956388403')
    }
  }

  const prefixes = ["y.", "Y.", "y,", "Y,", "<@816757904354705418>", "<@!816757904354705418>"]
  let prefix = false
  for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix
  }
  if (!prefix) return
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  client.comandos = new Discord.Collection()
  for (var archivo of readdirSync(`${__dirname}/../Comandos`)) {
    let comandos = require(`${__dirname}/../Comandos/${archivo}`)
    client.comandos.set(comandos.nombre, comandos)
  }
  let comando = client.comandos.get(command) || client.comandos.find(c => c.alias && c.alias.includes(command))
  if (!comando) return
  if (comando.categoria !== 'admin' && !canales.includes(message.channel.id)) return
  if (comando.categoria === 'admin' && !message.member.permissions.has("ADMINISTRATOR")) return message.react("<:non:843389719895080981>")
  if (cooldown.has(message.channel.id && comando.nombre)) return message.react("⌛")
  cooldown.add(message.channel.id)
  cooldown.add(comando.nombre)
  setTimeout(() => {
    cooldown.delete(message.channel.id)
    cooldown.delete(comando.nombre)
  }, comando.cooldown)
  comando.run(Discord, client, message, args)
}