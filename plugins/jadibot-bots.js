import ws from "ws"

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'https://moonfare.team'

const rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363423335018677@newsletter",
      serverMessageId: '',
      newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
},
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icon,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true
}
}
}

const handler = async (m, { conn, command, usedPrefix, participants}) => {
  try {
    const users = [
      global.conn.user.jid,
...new Set(
        global.conns
.filter(c => c.user && c.ws?.socket && c.ws.socket.readyState!== ws.CLOSED)
.map(c => c.user.jid)
)
    ]

    const convertirMsADiasHorasMinutosSegundos = (ms) => {
      const segundos = Math.floor(ms / 1000)
      const minutos = Math.floor(segundos / 60)
      const horas = Math.floor(minutos / 60)
      const días = Math.floor(horas / 24)
      const segRest = segundos % 60
      const minRest = minutos % 60
      const horasRest = horas % 24
      let resultado = ""
      if (días) resultado += `${días} días, `
      if (horasRest) resultado += `${horasRest} horas, `
      if (minRest) resultado += `${minRest} minutos, `
      if (segRest) resultado += `${segRest} segundos`
      return resultado.trim()
}

    let groupBots = users.filter(bot => participants.some(p => p.id === bot))
    if (participants.some(p => p.id === global.conn.user.jid) &&!groupBots.includes(global.conn.user.jid)) {
      groupBots.push(global.conn.user.jid)
}

    const botsGroup = groupBots.length> 0
? groupBots.map(bot => {
          const isMainBot = bot === global.conn.user.jid
          const v = global.conns.find(c => c.user.jid === bot)
          const uptime = isMainBot
? convertirMsADiasHorasMinutosSegundos(Date.now() - global.conn.uptime)
: v?.uptime
? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime)
: "Activo desde ahora"
          const mention = bot.replace(/[^0-9]/g, '')
          return `@${mention}\n🧠 Bot: ${isMainBot? 'Principal': 'Sub-Bot'}\n⏱️ Online: ${uptime}`
}).join("\n\n")
: `🌙 No hay bots activos en este grupo.`

    const message = `
📚 *Lista de Bots Activos*

☕ *Bot Principal:* 1
🍁 *Sub-Bots:* ${users.length - 1}
👥 *Bots en este grupo:* ${groupBots.length}

━━━━━━━━━━━━━━━━━━━━━━━

${botsGroup}
    `.trim()

    const mentionList = groupBots.map(bot => bot.endsWith("@s.whatsapp.net")? bot: `${bot}@s.whatsapp.net`)
    rcanal.contextInfo.mentionedJid = mentionList

    await conn.sendMessage(m.chat, {
      text: message,
...rcanal
}, { quoted: m})

} catch (error) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ Se ha producido un error.\nUsa *${usedPrefix}report* para informarlo.\n\n${error.message}`,
...rcanal
}, { quoted: m})
}
}

handler.tags = ["serbot"]
handler.help = ["botlist"]
handler.command = ["botlist", "bots"]

export default handler
