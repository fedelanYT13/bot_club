const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙';
const dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛';
const icon = 'https://files.catbox.moe/gm249p.jpg';
const redes = 'https://moonfare.team';

const rcanal = {
  contextInfo: {
    mentionedJid: [],
    isForwarded: true,
    forwardingScore: 999,
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
};

let handler = async (m, { conn, command}) => {
  try {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupName = groupMetadata.subject;
    const groupJid = groupMetadata.id;
    const isClosed = groupMetadata.announce;

    if (command === 'cerrar') {
      if (isClosed) {
        return conn.sendMessage(m.chat, {
          text: `🔒 El grupo *${groupName}* ya está cerrado.\n ${groupJid}`,
...rcanal
});
}
      await conn.groupSettingUpdate(m.chat, 'announcement');
      return conn.sendMessage(m.chat, {
        text: `🔒 El grupo *${groupName}* ha sido cerrado correctamente.\n ${groupJid}`,
...rcanal
});
}

    if (command === 'abrir') {
      if (!isClosed) {
        return conn.sendMessage(m.chat, {
          text: `☕ El grupo *${groupName}* ya está abierto.\n ${groupJid}`,
...rcanal
});
}
      await conn.groupSettingUpdate(m.chat, 'not_announcement');
      return conn.sendMessage(m.chat, {
        text: `🌙 El grupo *${groupName}* ha sido abierto correctamente.\n ${groupJid}`,
...rcanal
});
}

    return conn.sendMessage(m.chat, {
      text: '❎ *Error, comando no reconocido. Reporta al canal de soporte.*',
...rcanal
});

} catch (e) {
    console.error(e);
    return conn.sendMessage(m.chat, {
      text: `🌙 *Error al realizar la configuración del grupo:* ${e.message}`,
...rcanal
});
}
};

handler.help = ['cerrar', 'abrir'];
handler.tags = ['group'];
handler.command = ['cerrar', 'abrir'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
