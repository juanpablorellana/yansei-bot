module.exports = {
  nombre: "ayuda",
  alias: ["help", "h", "a"],
  cooldown: 5000,
  descripcion: "Te muestra como usar el Bot. Agregando el nombre de un comando o de una categoría, te informará más.",
  uso: "(comando / comandos)",
  categoria: "general",
  run: async (Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor('000001')
    if (!args[0]) {
      function field(cat) {
        return `> \`${client.comandos.filter(c => c.categoria == cat).map(c => c.nombre).join('`, `')}\``
      }
      let footer = ['Usa y.ayuda (comando / comandos) para saber más!']
      embed.setTitle("**yansei**")
      embed.setDescription("Bot creado por <@!753600264740536330>\nCentrado en la utilidad, pero también tiene comandos de entretención.\nSugieran cosas para el bot en <#617178029541687297>\nEl prefix es `y.` o mencionar al bot\n\n")
      embed.addField("**Comandos**", field('comandos'))
      embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
      embed.setFooter(footer[Math.floor(Math.random() * footer.length)])
      if (message.member.hasPermission("ADMINISTRATOR")) {
        embed.addField("**Admin**", field('admin'))
      }
      message.channel.send(embed)
    } else {
      let arg = args[0].toLowerCase()
      let categoria = client.comandos.map(c => c.categoria).some(c => c === arg)
      let comando = client.comandos.get(arg) || client.comandos.find(c => c.alias && c.alias.includes(arg))
      if (!comando && !categoria) {
        embed.setDescription("No encontré ese comando, usa y.ayuda para ver todos los disponibles!")
        message.channel.send(embed)
      } else if (comando) {
        if (comando.categoria === 'mod' && !message.member.permissions.has("ADMINISTRATOR")) return message.react("<:non:843389719895080981>")
        if (comando.categoria === 'privada' && message.author.id !== "753600264740536330") return message.react("<:non:843389719895080981>")

        let aliases = comando.alias.join("`, `") || "Ninguno"
        embed.setDescription(`${comando.descripcion}\n\n**» Comando** - \`y.${comando.nombre}${!comando.uso ? '' : ' ' + comando.uso}\`\n**» Aliases** - \`${aliases}\`\n**» Cooldown** - \`${!comando.cooldown ? 'No tiene' : comando.cooldown / 1000 + "s"}\``)
        if (comando.uso) embed.setFooter("() Opcional  [] Obligatorio")
        message.channel.send(embed)
      } else if (categoria) {
        if (arg === 'mod' && !message.member.permissions.has("ADMINISTRATOR")) return message.react("<:non:843389719895080981>")
        if (arg === 'privada' && message.author.id !== "753600264740536330") return message.react("<:non:843389719895080981>")

        embed.setTitle(`**${args[0][0].toUpperCase() + args[0].slice(1).toLowerCase()}**`)
        embed.setDescription(`${client.comandos.filter(c => c.categoria === arg).map(c => `> \`y.${c.nombre}${!c.uso ? '' : ' ' + c.uso}\` - ${c.descripcion}`).join('\n')}`)
        embed.setFooter("() Opcional  [] Obligatorio")
        message.channel.send(embed)
      }
    }
  }
}