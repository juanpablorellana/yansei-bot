module.exports = {
  nombre: "ban",
  alias: [],
  cooldown: 2000,
  descripcion: "Banea a un usuario",
  uso: "[miembro] (razón)",
  categoria: "admin",
  run: async (Discord, client, message, args) => {
    const razon = args.slice(1).join(" ") || "No especificada"
    const miembro = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0]).catch(() => { })
    function mensajerror() {
      message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    }
    const embed = new Discord.MessageEmbed()
      .setColor(0x000001)
    const embed2 = new Discord.MessageEmbed()
      .setColor(0x000001)

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.react("<:non:843389719895080981>")
    } else if (!args[0]) {
      embed.setDescription("Debes mencionar a un usuario")
      return mensajerror()
    }
    if (!miembro) {
      embed.setDescription("No encontré a ese usuario")
      return mensajerror()
    } else if (message.guild.members.cache.has(miembro.id || miembro.user.id)) {
      if (message.member.roles.highest.comparePositionTo(miembro.roles.highest) <= 0) {
        embed.setDescription("No puedes banear a este usuario")
        return mensajerror()
      } else if (!miembro.bannable) {
        embed.setDescription("No puedo banear a ese usuario")
        return mensajerror()
      }
    }
    message.guild.members.ban(miembro, { reason: razon }).then(() => {
      embed.setDescription(`**${miembro.tag || miembro.user.tag} baneado** || Razón - ${razon}`)
      message.channel.send(embed)
      embed2.setDescription(`**${miembro.tag || miembro.user.tag} baneado**\nRazón - ${razon}\nBaneado por - <@${message.member.user.id}>`)
      client.channels.cache.get("733494343582613524").send(embed2)
    }).catch(e => {
      console.log(e)
      message.channel.send("Hubo un error")
    })
  }
}