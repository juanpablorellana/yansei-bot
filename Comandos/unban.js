module.exports = {
  nombre: "unban",
  alias: ["desbanear"],
  cooldown: 2000,
  descripcion: "Desbanea a un usuario",
  uso: "[miembro] (razón)",
  categoria: "admin",
  run: async (Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor(0x000001)
    const razon = args.slice(1).join(" ") || "No especificada"
    function mensajerror() {
      message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
    }

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.react("<:non:843389719895080981>")
    } else if (!args[0]) {
      embed.setDescription("Debes mencionar a un usuario")
      return mensajerror()
    } else {
      message.guild.fetchBans().then(async bans => {
        const baniao = bans.find(b => b.user.username.toLowerCase() == args[0] || b.user.id == args[0])
        if (!baniao) {
          embed.setDescription("No encontré a ese usuario")
          return mensajerror()
        }
        embed.setDescription(`**${baniao.user.tag} desbaneado** || Razón - ${razon}`)
        message.guild.members.unban(baniao.user, razon).then(() => {
          message.channel.send(embed)
          const embed2 = new Discord.MessageEmbed()
            .setDescription(`**${baniao.user.tag} desbaneado**\nRazón - ${razon}\nDesbaneado por - <@${message.member.user.id}>`)
            .setColor(0x000001)
          client.channels.cache.get("733494343582613524").send(embed2)
        }).catch(e => {
          console.log(e)
          message.channel.send("Hubo un error")
        })
      })
    }
  }
}