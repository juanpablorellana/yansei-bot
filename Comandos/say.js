module.exports = {
  nombre: "say",
  alias: ["decir"],
  descripcion: "Haz que el bot diga algo",
  uso: "[mensaje]",
  categoria: "admin",
  run: (Discord, client, message, args) => {
    message.delete()
    if (message.mentions.roles.size !== 0 || message.content.includes('@everyone') || message.content.includes('@here')) {
      message.author.send('no puedes hacer eso')
    }
    message.channel.send(args.join(" "), { allowedMentions: { parse: [] } })
  }
}