import { WAMessageStubType} from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true;

  const chat = globalThis.db.data.chats[m.chat];
  const userss = m.messageStubParameters[0];
  const ppUrl = await conn.profilePictureUrl(userss, 'image').catch(() => "https://files.catbox.moe/gm249p.jpg");

  const actionUser = m.key.participant? await conn.getName(m.key.participant): null;

  const actionMessages = {
    [WAMessageStubType.GROUP_PARTICIPANT_ADD]: actionUser? `\n┊ ☕ *Agregado por ›* @${m.key.participant.split`@`[0]}`: '',
    [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]: actionUser? `\n┊ 🌙 *Eliminado por ›* @${m.key.participant.split`@`[0]}`: '',
    [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]: ''
};

  let memberCount = participants.length;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount += 1;
  else if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount -= 1;

  const formatText = (template, memberCount) => {
    return template
.replace('@user', `@${userss.split`@`[0]}`)
.replace('@group', groupMetadata.subject)
.replace('@date', new Date().toLocaleString())
.replace('@users', `${memberCount}`)
.replace('@type', actionMessages[m.messageStubType])
.replace('@desc', groupMetadata.desc?.toString() || '☕ Sin descripción 🍁');
};

  const welcomeMessage = formatText(chat.sWelcome || `╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⌁───╮
│ 「 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒊𝒅𝒐 𝒂𝒍 𝒈𝒓𝒖𝒑𝒐 」
│─────────────────────
│ 🧸 𝑵𝒐𝒎𝒃𝒓𝒆 › @user
│ 🏷️ 𝑮𝒓𝒖𝒑𝒐 › @group
│ 📝 𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊ó𝒏 › @desc
│ @type
│📌 𝑼𝒔𝒂 /menu 𝒑𝒂𝒓𝒂 𝒗𝒆𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔.
│👥 𝑨𝒉𝒐𝒓𝒂 𝒔𝒐𝒎𝒐𝒔 @users 𝒎𝒊𝒆𝒎𝒃𝒓𝒐𝒔.
╰─────────────────────╯`, memberCount);

  const byeMessage = formatText(chat.sBye || `╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⌁───╮
│ 「 𝑯𝒂𝒔𝒕𝒂 𝒑𝒓𝒐𝒏𝒕𝒐 」
│─────────────────────
│ 🧸 𝑵𝒐𝒎𝒃𝒓𝒆 › @user
│ @type
│💭 𝑶𝒋𝒂𝒍𝒂 𝒗𝒖𝒆𝒍𝒗𝒂 𝒑𝒓𝒐𝒏𝒕𝒐.
│👥 𝑨𝒉𝒐𝒓𝒂 𝒒𝒖𝒆𝒅𝒂𝒏 @users 𝒎𝒊𝒆𝒎𝒃𝒓𝒐𝒔.
╰─────────────────────╯`, memberCount);

  const leaveMessage = formatText(chat.sBye || byeMessage, memberCount);
  const mentions = [userss, m.key.participant];

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;Dev-fedexyz;;;
FN:Dev-fedexyz
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Celular
END:VCARD`;

  const quotedContact = {
    key: {
      fromMe: false,
      participant: "13135550002@s.whatsapp.net",
      remoteJid: "status@broadcast",
},
    message: {
      contactMessage: {
        displayName: "𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕",
        vcard,
}
}
};

  const fakeContext = {
    contextInfo: {
      isForwarded: true,
      quotedMessage: quotedContact.message,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363423335018677@newsletter",
        serverMessageId: '',
        newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
},
      mentionedJid: mentions
}
};

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption: welcomeMessage,...fakeContext});
}

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption: byeMessage,...fakeContext});
}

  if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    await conn.sendMessage(m.chat, { image: { url: ppUrl}, caption: leaveMessage,...fakeContext});
}
}
