const Discord = require('discord.js');
module.exports = (client, oldMember, newMember) => {
  oldMember.guild.fetchAuditLogs().then(() => {
    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      if (oldMember.guild.id === '947357983162118154') return
      if (oldMember.roles.cache.has("760024402967396362")
        && !newMember.roles.cache.has("760024402967396362")) {
        const welcome = new Discord.MessageEmbed()
          .setAuthor("XXXTENTACION En Español", "https://i.imgur.com/OMpmjRn.png")
          .setDescription("Aquí puedes hablar sobre cualquier cosa.\nRecuerda revisar <#617177688603623484>, <#617177747428737074> y desde <#617165122242347008> para abajo hay canales de información")
          .setColor(0x000001)
        client.channels.cache.get("626588915771506690").send("<@" + newMember.id + ">", { embed: welcome })
      }
      if (oldMember.roles.cache.has("714939939367682048")
        && !newMember.roles.cache.has("714939939367682048")) {
        newMember.send("Te desmutearon de **XXXTENTACION En Español**, puedes volver a <#626588915771506690> a hablar <:tabienn:853046621071867924>").catch(() => {})
      }
      if (newMember.guild.roles.cache.filter(r => r.comparePositionTo('787513351994605589') > 0).some(r => newMember.roles.cache.has(r.id))) {
        newMember.roles.add("787513351994605589").catch(() => {})
      } else {
        newMember.roles.remove("787513351994605589").catch(() => {})
      }
      
      if (newMember.guild.roles.cache.filter(r => r.comparePositionTo('787511767957241868') < 0).some(r => newMember.roles.cache.has(r.id) && r.id !== '617155154659115019')) {
        newMember.roles.add("787511767957241868").catch(() => {})
      } else {
        newMember.roles.remove("787511767957241868").catch(() => {})
      }
    }
  })
}
