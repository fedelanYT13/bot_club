import { sticker} from '../lib/sticker.js'

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
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
      renderLargerThumbnail: false
}
}
}

async function handler(m, { conn, usedPrefix, command}) {
  const quoted = m.quoted || m
  const mime = (quoted.msg || quoted).mimetype || ''

  if (!mime) {
    return conn.sendMessage(m.chat, {
      text: `☕ *_Responde a una imagen o video para convertirlo en sticker._*`,
...rcanal
}, { quoted: m})
}

  const isImage = /image\/(jpe?g|png)/.test(mime)
  const isVideo = /video\/mp4/.test(mime)

  if (!isImage &&!isVideo) {
    return conn.sendMessage(m.chat, {
      text: `❌ Formato no compatible.\nSolo se aceptan imágenes (jpg, png) o videos cortos (mp4).`,
...rcanal
}, { quoted: m})
}

  const media = await quoted.download()
  const stickerBuffer = await sticker(media, false, namebot, dev)

  await conn.sendMessage(m.chat, {
    sticker: stickerBuffer,
...rcanal
}, { quoted: m})
}

handler.command = ['sticker', 's', 'stiker']
handler.help = ['sticker']
handler.tags = ['Herramientas']
export default handler
