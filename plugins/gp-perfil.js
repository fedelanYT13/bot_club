const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙';
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛';
const icon = 'https://files.catbox.moe/gm249p.jpg';

const rcanal = {
  contextInfo: {
    mentionedJid: [],
    isForwarded: true,
    forwardingScore: 999,
    externalAdReply: {
      title: namebot,
      body: dev,
      mediaUrl: null,
      previewType: "PHOTO",
      thumbnailUrl: icon,
      mediaType: 1,
      renderLargerThumbnail: false
}
}
}

let handler = async (m, { conn}) => {
  try {
    const user = global.db.data.users[m.sender]
    const profilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => null)

    const perfil = [
      '╭─「 *Perfil del Usuario* 」',
      `│`,
      `│ 🆔 *ID:* ${m.sender}`,
      `│ 🕹️ *Límite:* ${user.limit || 0}`,
      `│`,
      '╰───────────────'
    ].join('\n')

    if (profilePic) {
      await conn.sendMessage(m.chat, {
        image: { url: profilePic},
        caption: perfil,
...rcanal
}, { quoted: m})
} else {
      await conn.sendMessage(m.chat, {
        text: perfil,
...rcanal
}, { quoted: m})
}

} catch (e) {
    console.error(e)
    conn.reply(m.chat, `⚠️ Error al obtener el perfil:\n${e.message}`, m)
}
}

handler.help = ['perfil']
handler.tags = ['info']
handler.command = ['perfil']

export default handler
