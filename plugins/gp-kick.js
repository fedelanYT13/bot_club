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

async function handler(m, { conn, participants, isAdmin, isBotAdmin}) {
  if (!m.isGroup) {
    return conn.sendMessage(m.chat, {
      text: '❌ Este comando solo puede usarse en grupos.',
...rcanal
}, { quoted: m})
}

  if (!isAdmin) {
    return conn.sendMessage(m.chat, {
      text: '🌙 Solo los administradores pueden expulsar usuarios.',
...rcanal
}, { quoted: m})
}

  if (!isBotAdmin) {
    return conn.sendMessage(m.chat, {
      text: '⚠️ No tengo permisos de administrador para expulsar usuarios.',
...rcanal
}, { quoted: m})
}

  const target = m.mentionedJid[0] || m.quoted?.sender
  if (!target) {
    return conn.sendMessage(m.chat, {
      text: '☕ *_Menciona o responde al mensaje del usuario que deseas expulsar._*',
...rcanal
}, { quoted: m})
}

  if (participants.find(p => p.id === target)?.admin) {
    return conn.sendMessage(m.chat, {
      text: '⚠️ No puedo expulsar a otro administrador.',
...rcanal
}, { quoted: m})
}

  await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
  await conn.sendMessage(m.chat, {
    text: `🧹 Usuario expulsado: @${target.split('@')[0]}`,
    mentions: [target],
...rcanal
}, { quoted: m})
}

handler.customPrefix = /^(kick|ban|expulsar)$/i;
handler.command = new RegExp;
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler;
