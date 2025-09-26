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
}

let handler = async (m, { conn}) => {
  const start = new Date().getTime();
  const { key} = await conn.sendMessage(m.chat, { text: '⏳ Cargando ping...'}, { quoted: m});
  const end = new Date().getTime();

  const latency = end - start;
  const uptime = process.uptime(); // en segundos
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const secondsUp = Math.floor(uptime % 60);
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`;
  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // en MB

  const response = [
  '╭─❍ *Estado del Sistema* ❍─╮',
  `👤 *Usuario:* @${m.sender.split('@')[0]}`,
  `🚀 *Ping:* ${latency} ms`,
  `⏳ *Uptime:* ${uptimeFormatted}`,
  `💾 *RAM usada:* ${usedRAM} MB`,
  '╰───────────────────╯'
].join('\n');

  setTimeout(async () => {
    await conn.sendMessage(m.chat, {
      text: response,
      edit: key,
      mentions: [m.sender],
...rcanal
}, { quoted: m});
}, latency);
};

handler.help = ['ping', 'p'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];

export default handler;
