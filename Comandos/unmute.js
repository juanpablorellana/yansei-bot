module.exports = {
  nombre: "unmute",
  alias: ["desmutear"],
  cooldown: 2000,
  descripcion: "Desmutea a un miembro",
  uso: "[miembro] (razón)",
  categoria: "admin",
  run: (Discord, client, message, args) => {
    const miembro = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0])
    const razon = args.slice(1).join(" ") || "No especificada"
    const embed = new Discord.MessageEmbed()
      .setColor(0x000001)
    function mensajerror() {
      message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    }

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.react("<:non:843389719895080981>")
    } else if (!args[0] && !args[1]) {
      embed.setDescription("Debes mencionar a un miembro")
      return mensajerror()
    } else if (!miembro) {
      embed.setDescription("No encontré a ese usuario")
      return mensajerror()
    } else if (message.member.roles.highest.comparePositionTo(miembro.roles.highest) <= 0) {
      embed.setDescription("No puedes desmutear a este usuario")
      return mensajerror()
    } else {
      embed.setDescription(`**${miembro.user.tag} desmuteado** || Razón - ${razon}`)
      miembro.roles.remove("714939939367682048", razon).then(() => {
        message.channel.send(embed)
        const embed2 = new Discord.MessageEmbed()
          .setDescription(`**${miembro.user.tag} desmuteado**\nRazón - ${razon}\nDesmuteado por - <@${message.member.user.id}>`)
          .setColor(0x000001)
        client.channels.cache.get("733494343582613524").send(embed2)
      }).catch(e => {
        console.log(e)
        message.channel.send("Hubo un error")
      })
    }
  }
}