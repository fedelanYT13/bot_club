import { xpRange} from '../lib/levelling.js'

const textCyberpunk = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  main: textCyberpunk('sistema'),
  group: textCyberpunk('grupos'),
  serbot: textCyberpunk('sub bots')
}

const defaultMenu = {
  before: `
╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⌁───╮
│ ୧ ֹ ִ🌸 𝑯𝒐𝒍𝒂, *%name*
│─────────────────────
│ 🧾 𝑷𝒓𝒐𝒇𝒊𝒍 𝒅𝒆 𝒖𝒔𝒖𝒂𝒓𝒊𝒐
│ ┆ 📚 𝑬𝒔𝒕𝒂𝒅𝒐: 𝒏𝒐𝒓𝒎𝒂𝒍
│ ┆ 🌟 𝑷𝒓𝒆𝒎𝒊𝒖𝒎: *%premium*
│ ┆ ☕ 𝑽𝒆𝒓𝒔𝒊𝒐́𝒏: *𝟐.𝟎.𝟐.𝟓*
│─────────────────────
│ ⚙️ 𝑬𝒔𝒕𝒂𝒅𝒐 𝒅𝒆𝒍 𝒃𝒐𝒕
│ ┆ 🛡️ 𝑮𝒓𝒖𝒑𝒐𝒔 𝒂𝒄𝒕𝒊𝒗𝒐𝒔: *%groupsCount*
│ ┆ ⏱️ 𝑻𝒊𝒆𝒎𝒑𝒐 𝒆𝒏 𝒍𝒊́𝒏𝒆𝒂: *%muptime*
│ ┆ 📋 𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒅𝒐𝒔: *%totalreg*
╰─────────────────────╯
%readmore
`.trimStart(),
  header: '\n˚ `ヾ(≡^∇^≡)ﾉ` *%category*',
  body: '⏤͟͟͞͞☕ ⇢ %cmd\n',
  footer: '',
  after: '\n> © 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 𝖬𝗈𝗈𝖓𝖿𝗋𝖺𝗋𝖾 𝗍𝖾𝖺𝗆 ☽'
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    await conn.sendMessage(m.chat, { react: { text: '🌸', key: m.key}})

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
},
},
};

    let { exp, level} = global.db.data.users[m.sender]
    let { min, xp, max} = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let ramUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
    let totalreg = Object.keys(global.db.data.users).length
    let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    let premium = global.db.data.users[m.sender].premium? '✅ ꜱɪ́': '❌ ɴᴏ'
    let mode = global.opts["self"]? "Privado": "Público"
    const perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
      enabled:!p.disabled
}))

    for (let plugin of help) {
      if (plugin.tags) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textCyberpunk(t)
}
}
}

    const { before, header, body, footer, after} = defaultMenu

    let menuText = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
}),
      after
    ].join('\n')

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      ram: ramUsage,
      premium,
      groupsCount,
      readmore: String.fromCharCode(8206).repeat(4001)
  }

    let finalMenu = menuText.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    const imageUrl = 'https://files.catbox.moe/gm249p.jpg'

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl},
      caption: finalMenu,
      gifPlayback: true,
      gifAttribution: 0,
      buttons: [
        { buttonId: '.code', buttonText: { displayText: '☕ ᴄᴏᴅᴇ'}, type: 1}
      ],
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363423335018677@newsletter",
          serverMessageId: '',
          newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
},
        externalAdReply: {
          title: '☕ 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 🌙\n⚡︎ 𝑽𝒆𝒓𝒔𝒊𝒐𝒏 𝟐.𝟎.𝟐.𝟓 ☽',
          thumbnailUrl: perfil,
          mediaType: 1,
          renderLargerThumbnail: false,
          sourceUrl: 'https://moonfare.team'
}
}
}, { quoted: quotedContact})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error al generar el menú del sistema.', m)
}
}

handler.help = ['menu', 'menú']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
      }
