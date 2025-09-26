import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn}) => {
  const emoji = {
    warning: '⚠️',
    wait: '⏳',
    success: '✅',
    fail: '❌'
}

  const quoted = m.quoted || m
  const mime = (quoted.msg || quoted).mimetype || ''

  if (!mime) {
    return conn.reply(m.chat, `${emoji.warning} Por favor, responde a una *imagen* o *video*.`, m)
}

  await m.react(emoji.wait)

  try {
    const media = await quoted.download()
    const isImageOrVideo = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    const link = await (isImageOrVideo? uploadImage: uploadFile)(media)
    const preview = await (await fetch(link)).buffer()

    const caption = [
      '乂  *L I N K - E N L A C E*  乂',
      '',
      `*» Enlace:* ${link}`,
      `*» Acortado:* ${await shortUrl(link)}`,
      `*» Tamaño:* ${formatBytes(media.length)}`,
      `*» Expiración:* ${isImageOrVideo? 'No expira': 'Desconocido'}`
    ].join('\n')

    await conn.sendMessage(m.chat, {
      image: preview,
      caption
}, { quoted: m})

    await m.react(emoji.success)
} catch (err) {
    console.error(err)
    await m.react(emoji.fail)
    conn.reply(m.chat, `${emoji.warning} Ocurrió un error:\n${err.message}`, m)
}
}

handler.help = ['tourl']
handler.tags = ['transformador']
handler.register = true
handler.command = ['tourl', 'upload']

export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${units[i]}`
}

async function shortUrl(url) {
  const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}
