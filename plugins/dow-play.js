import fetch from "node-fetch"
import yts from "yt-search"

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

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command}) => {
  try {
    if (!text.trim()) {
      return conn.sendMessage(m.chat, {
        text: `☕ Debes escribir el *nombre* o *link* del video/audio para descargar.`,
...rcanal
}, { quoted: m})
}

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key}})

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind? "https://youtu.be/" + videoIdToFind[1]: text)

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
}

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}})
      return conn.sendMessage(m.chat, {
        text: "⚠️ No encontré resultados. Intenta con otro nombre o link.",
...rcanal
}, { quoted: m})
}

    const { title, thumbnail, timestamp, views, ago, url, author} = ytplay2
    const vistas = formatViews(views)
    const canal = author?.name || "Desconocido"

    const infoMessage = `
📥 *Descarga en curso...*

🎧 *Título:* ${title}
📺 *Canal:* ${canal}
⏱️ *Duración:* ${timestamp}
👁️ *Vistas:* ${vistas}
📅 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

${namebot}
    `.trim()

    const thumb = (await conn.getFile(thumbnail))?.data
    await conn.sendMessage(m.chat, {
      text: infoMessage,
...rcanal
}, { quoted: m})

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      let audioData = null
      try {
        const r = await (await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(url)}`)).json()
        if (r?.status && r?.download?.url) {
          audioData = { link: r.download.url, title: r.metadata?.title}
}
} catch {}

      if (!audioData) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}})
        return conn.sendMessage(m.chat, {
          text: "🌙 No se pudo descargar el audio. Intenta más tarde.",
...rcanal
}, { quoted: m})
}

      await conn.sendMessage(m.chat, {
        audio: { url: audioData.link},
        fileName: `${audioData.title || "music"}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false,
...rcanal
}, { quoted: m})

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}})
}

    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      let videoData = null
      try {
        const r = await (await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp4?url=${encodeURIComponent(url)}`)).json()
        if (r?.status && r?.download?.url) {
          videoData = { link: r.download.url, title: r.metadata?.title}
}
} catch {}

      if (!videoData) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}})
        return conn.sendMessage(m.chat, {
          text: "🌙 No se pudo descargar el video. Intenta más tarde.",
...rcanal
}, { quoted: m})
}

      await conn.sendMessage(m.chat, {
        video: { url: videoData.link},
        fileName: `${videoData.title || "video"}.mp4`,
        caption: `${title}`,
        mimetype: "video/mp4",
...rcanal
}, { quoted: m})

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key}})
}

    else {
      return conn.sendMessage(m.chat, {
        text: "🌘 Comando no válido. Revisa el menú.",
...rcanal
}, { quoted: m})
}

} catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key}})
    return conn.sendMessage(m.chat, {
      text: `⚠️ Error inesperado:\n\n${error}`,
...rcanal
}, { quoted: m})
}
}

handler.command = handler.help = ["play", "ytmp3", "play2", "ytmp4", "playaudio"]
handler.tags = ["descargas"]
export default handler

function formatViews(views) {
  if (!views) return "No disponible"
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k`
  return views.toString()
}
