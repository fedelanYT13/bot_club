let handler = async (m, { conn, text, args}) => {
  const chat = global.db.data.chats[m.chat]
  const estado = chat?.bannedGrupo?? false

  if (!args[0]) {
    const estadoTexto = estado? '✗ Desactivado': '✓ Activado'
    const info = `
🫟 𝑬𝒔𝒕𝒂𝒅𝒐 𝒅𝒆 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒈𝒓𝒖𝒑𝒐

📚 𝑬𝒔𝒕𝒂𝒅𝒐 𝒂𝒄𝒕𝒖𝒂𝒍: ${estadoTexto}

🌸 𝑷𝒖𝒆𝒅𝒆𝒔 𝒄𝒂𝒎𝒃𝒊𝒂𝒓𝒍𝒐 𝒄𝒐𝒏:
🟢 𝑨𝒄𝒕𝒊𝒗𝒂𝒓: *bot on*
🔴 𝑫𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒓: *bot off*

𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒔𝒊𝒆𝒎𝒑𝒓𝒆 𝒆𝒔𝒕𝒂́ 𝒍𝒊𝒔𝒕𝒂 𝒑𝒂𝒓𝒂 𝒂𝒚𝒖𝒅𝒂𝒓𝒕𝒆 🌙
    `.trim()
    return m.reply(info)
}

  try {
    const accion = args[0].toLowerCase()

    if (accion === 'off') {
      if (estado) return m.reply('🌙 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒚𝒂 𝒆𝒔𝒕𝒂𝒃𝒂 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒂 𝒆𝒏 𝒆𝒔𝒕𝒆 𝒈𝒓𝒖𝒑𝒐.\n𝑫𝒆𝒔𝒄𝒂𝒏𝒔𝒂 𝒆𝒏𝒕𝒓𝒆 𝒍𝒐𝒔 𝒑𝒆́𝒕𝒂𝒍𝒐𝒔...')
      chat.bannedGrupo = true
      return m.reply('☕ 𝑯𝒂𝒔 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐 𝒂 𝑲𝒂𝒐𝒓𝒖𝒌𝒐.\n𝑬𝒍𝒍𝒂 𝒔𝒆 𝒓𝒆𝒕𝒊𝒓𝒂 𝒄𝒐𝒏 𝒆𝒍𝒆𝒈𝒂𝒏𝒄𝒊𝒂 🌌')
}

    if (accion === 'on') {
      if (!estado) return m.reply('🌙 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒚𝒂 𝒆𝒔𝒕𝒂𝒃𝒂 𝒂𝒄𝒕𝒊𝒗𝒂.\n𝑺𝒊𝒆𝒎𝒑𝒓𝒆 𝒂𝒕𝒆𝒏𝒕𝒂 𝒆𝒏𝒕𝒓𝒆 𝒍𝒂𝒔 𝒆𝒔𝒕𝒓𝒆𝒍𝒍𝒂𝒔.')
      chat.bannedGrupo = false
      return m.reply('👻 𝑯𝒂𝒔 𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐 𝒂 𝑲𝒂𝒐𝒓𝒖𝒌𝒐.\n𝑬𝒍𝒍𝒂 𝒗𝒖𝒆𝒍𝒗𝒆 𝒄𝒐𝒏 𝒅𝒖𝒍𝒛𝒖𝒓𝒂 𝒑𝒂𝒓𝒂 𝒂𝒚𝒖𝒅𝒂𝒓𝒕𝒆 🌸')
}

    return m.reply(`
☕ 𝑪𝒐𝒎𝒂𝒏𝒅𝒐 𝒏𝒐 𝒓𝒆𝒄𝒐𝒏𝒐𝒄𝒊𝒅𝒐

𝑼𝒔𝒂:
• *bot on*  → 𝑨𝒄𝒕𝒊𝒗𝒂𝒓 𝒂 𝑲𝒂𝒐𝒓𝒖𝒌𝒐
• *bot off* → 𝑫𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒓𝒍𝒂 𝒕𝒆𝒎𝒑𝒐𝒓𝒂𝒍𝒎𝒆𝒏𝒕𝒆
    `.trim())
} catch (e) {
    await m.reply('🌙 𝑶𝒄𝒖𝒓𝒓𝒊𝒐́ 𝒖𝒏 𝒆𝒓𝒓𝒐𝒓 𝒊𝒏𝒆𝒔𝒑𝒆𝒓𝒂𝒅𝒐.\n𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒆𝒔𝒕𝒂́ 𝒓𝒆𝒗𝒊𝒔𝒂𝒏𝒅𝒐 𝒍𝒐𝒔 𝒉𝒊𝒍𝒐𝒔 𝒅𝒆𝒍 𝒔𝒊𝒔𝒕𝒆𝒎𝒂...')
}
}

handler.tags = ['grupo']
handler.help = ['bot']
handler.command = ['bot']
handler.admin = true

export default handler
