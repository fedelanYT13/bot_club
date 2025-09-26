const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'moonfare.team'

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
      renderLargerThumbnail: false
}
}
}

async function handler(m, { conn}) {
  const activeBots = global.conns.filter(bot => bot.user && bot.ws?.socket?.readyState!== ws.CLOSED)

  if (activeBots.length <= 1) {
    await conn.sendMessage(m.chat, {
      text: '⚠️ No hay Sub-Bots activos para eliminar.',
...rcanal
}, { quoted: m})
    return
}

  const subBots = activeBots.slice(1) // Excluye el Bot Principal

  for (const bot of subBots) {
    try {
      await bot.ws.close()
      console.log(`🗑️ Sub-Bot eliminado: ${bot.user.jid}`)
} catch (e) {
      console.error(`❌ Error al eliminar Sub-Bot ${bot.user.jid}:`, e)
}
}

  await conn.sendMessage(m.chat, {
    text: `✅ Se han eliminado ${subBots.length} Sub-Bots.\n🤖 Bot Principal sigue activo.`,
...rcanal
}, { quoted: m})
}

handler.command = ['limpiar', 'limpiarsub']
handler.help = ['limpiar']
handler.tags = ['jadibot']
export default handler
