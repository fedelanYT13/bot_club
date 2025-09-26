const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'https://moonfare.team'

const rcanal = {
  contextInfo: {
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      sourceUrl: redes,
      previewType: "PHOTO",
      thumbnailUrl: icon,
      mediaType: 1,
      renderLargerThumbnail: false
}
}
}

let handler = async (m, { conn, args, command}) => {
  const setting = args[0]?.toLowerCase()
  const chatData = global.db.data.chats[m.chat]
  const status = command === 'on'

  if (!setting) {
    return conn.sendMessage(m.chat, {
      text: `
☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 necesita saber qué función deseas modificar.

✨ Ejemplo: *${command} welcome*
`.trim(),
...rcanal
}, { quoted: m})
}

  const reply = (name) => conn.sendMessage(m.chat, {
    text: `
📚 La función *${name}* ha sido *${status? 'activada': 'desactivada'}* en este grupo.

𝑲𝒂𝒐𝒓𝒖𝒌𝒐 está al tanto 🌙
`.trim(),
...rcanal
}, { quoted: m})

  switch (setting) {
    case 'antilinks':
    case 'antienlaces':
      chatData.antilink = status
      reply('Anti Enlaces')
      break

    case 'rpg':
    case 'economia':
      chatData.rpg = status
      reply('Economía')
      break

    case 'gacha':
      chatData.gacha = status
      reply('Gacha')
      break

    case 'adminonly':
    case 'onlyadmin':
      chatData.adminonly = status
      reply('Solo Admins')
      break

    case 'nsfw':
      chatData.nsfw = status
      reply('NSFW')
      break

    case 'welcome':
      chatData.welcome = status
      reply('Bienvenida')
      break

    case 'alerts':
    case 'alertas':
      chatData.alerts = status
      reply('Alertas')
      break

    default:
      return conn.sendMessage(m.chat, {
        text: `
🌙 La función ingresada no es *válida*

📚 *Funciones disponibles:*
  └─ welcome
  └─ antienlaces
  └─ antilinks
  └─ economia
  └─ gacha
  └─ nsfw
  └─ alertas

☕ *Ejemplo:* ${command} welcome
`.trim(),
...rcanal
}, { quoted: m})
}
}

handler.help = ['on <función>', 'off <función>']
handler.tags = ['group']
handler.command = ['on', 'off']
handler.admin = true

export default handler
