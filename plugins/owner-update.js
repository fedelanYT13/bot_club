import { execSync} from 'child_process';

const handler = async (m, { conn, text}) => {
  try {
    const stdout = execSync('git pull' + (m.fromMe && text? ' ' + text: ''));
    let output = stdout.toString();

    if (output.includes('Already up to date')) {
      output = '☕ *_𝖸𝖺 𝖾𝗌𝗍𝗈𝗒 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝖽𝖺 𝗇𝗎𝖾𝗏𝖺𝗆𝖾𝗇𝗍𝖾._*';
} else if (output.includes('Updating')) {
      output = '🌙 *_𝖯𝗋𝗈𝖼𝖾𝗌𝖺𝗇𝖽𝗈, 𝖾𝗌𝗉𝖾𝗋𝖾 𝗎𝗇 𝗆𝗈𝗆𝖾𝗇𝗍𝗈 𝗆𝗂𝖾𝗇𝗍𝗋𝖺𝗌 𝗆𝖾 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝗈._*\n\n' + stdout.toString();
}

    await conn.reply(m.chat, output, m);
} catch {
    try {
      const status = execSync('git status --porcelain');
      if (status.length> 0) {
        const conflictedFiles = status.toString()
.split('\n')
.filter(line => line.trim()!== '')
.map(line => {
            if (
              line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') ||
              line.includes('datos.json') || line.includes('database.json') ||
              line.includes('sessions/') || line.includes('npm-debug.log')
) return null;
            return '*→ ' + line.slice(3) + '*';
})
.filter(Boolean);

        if (conflictedFiles.length> 0) {
          const errorMessage = `🌙 𝖭𝗈 𝗌𝖾 𝗉𝗎𝖾𝖽𝖾 𝖺𝖼𝗍𝗎𝖺𝗅𝗂𝗓𝖺𝗋 𝖽𝖾𝖻𝗂𝖽𝗈 𝖺 𝖼𝗈𝗇𝖿𝗅𝗂𝖼𝗍𝗈𝗌:\n${conflictedFiles.join('\n')}`;
          await conn.reply(m.chat, errorMessage, m);
}
}
} catch (error) {
      console.error(error);
      let errorMessage = '🌙 𝖮𝖼𝗎𝗋𝗋𝗂𝗈́ 𝗎𝗇 𝖾𝗋𝗋𝗈𝗋 𝗂𝗇𝖾𝗌𝗉𝖾𝗋𝖺𝖽𝗈.';
      if (error.message) {
        errorMessage += `\n🧩 𝖣𝖾𝗍𝖺𝗅𝗅𝖾𝗌: ${error.message}`;
}
      await conn.reply(m.chat, errorMessage, m);
}
}
};

handler.customPrefix = /^(fix|update|up)$/i;
handler.command = new RegExp;
handler.owner = true;

export default handler;
