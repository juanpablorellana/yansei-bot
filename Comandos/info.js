module.exports = {
  nombre: "información",
  alias: ["i", "info", "informacion"],
  cooldown: 1000,
  descripcion: "Te manda el canal donde encontrar la info de esa canción",
  uso: "[canción]",
  categoria: "comandos",
  run: async (Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Por favor nombra una canción")
    let canal = client.channels.cache.find(c => args.join("-").includes(c.name))
    if (!canal) return message.channel.send("No encontré ningún canal con ese nombre")
    message.channel.send(`<#${canal.id}>`)
  }
}