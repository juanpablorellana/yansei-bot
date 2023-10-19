const Discord = require('discord.js')
const client = new Discord.Client({
  ws: { intents: 32767 },
  partials: ["MESSAGE", "REACTION"]
})

const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('Lindo'))
app.listen(3000)

let { readdirSync } = require("fs")
for (const file of readdirSync("./Eventos/")) {
  let fileName = file.substring(0, file.length - 3)
  let fileContents = require(`./Eventos/${file}`)
  client.on(fileName, fileContents.bind(null, client))
}

client.login(process.env.token)