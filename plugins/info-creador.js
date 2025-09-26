let handler = async (m, { conn}) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:☕ 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛
ORG:𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕
TITLE:𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛
EMAIL;type=INTERNET:fedelanyt20md@gmail.com
TEL;type=CELL;waid=5491137612743: +54 9 11 3761-2743
ADR;type=WORK:;;Buenos Aires;;Argentina
URL;type=WORK:https://dev-fedexyz.neocities.org
X-WA-BIZ-NAME:𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕
X-WA-BIZ-DESCRIPTION:© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑲𝒂𝒐𝒓𝒖𝒌𝒐.
X-WA-BIZ-HOURS:Mo-Su 00:00-23:59
END:VCARD`;

  const quotedContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
},
    message: {
      contactMessage: {
        displayName: "☕ 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛",
        vcard
}
}
};

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: '☕ 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛',
      contacts: [{ vcard}]
},
    contextInfo: {
      externalAdReply: {
        title: '🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽',
        body: '☕ Contacto directo del creador',
        thumbnailUrl: 'https://files.catbox.moe/gm249p.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://moonfare.team'
}
}
}, { quoted: quotedContact});
};

handler.help = ['owner'];
handler.tags = ['info'];
handler.command = ['owner', 'creador', 'donar'];

handler.all = async function (m) {
  if (!m.text) return;
  const txt = m.text.trim().toLowerCase();
  if (['owner', 'creador', 'donar'].includes(txt)) {
    return handler(m, { conn: this, args: []});
}
};

export default handler;
