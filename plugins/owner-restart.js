let handler = async (m, { conn }) => {
  await conn.reply(m.chat, `☕ Reiniciando...\n> 🌙 *Espere un momento...*`, m);
  setTimeout(() => {
    process.exit(0);
  }, 3000);
};

handler.customPrefix = /^(rest|restar)$/i;
handler.command = new RegExp;
handler.owner = true;
handler.register = true;

export default handler;
