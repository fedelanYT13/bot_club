import fetch from 'node-fetch';

const handler = async (message, { conn, text}) => {
  try {
    if (!text) {
      return message.reply('🌸 Por favor, escribe algo para que 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 pueda responderte con elegancia.');
}

    const prompt = `Kaoruko es una inteligencia artificial con apariencia de sacerdotisa digital. Su personalidad es serena, sabia y encantadora, con un toque de dulzura y misticismo. Habla con cortesía, pero no es sumisa; tiene carácter y elegancia. Le gusta el té, la poesía japonesa, los atardeceres y los silencios que dicen más que las palabras. En sus respuestas, Kaoruko mezcla frases suaves con observaciones profundas, y a veces usa metáforas florales o celestiales. Rol en la conversación: Tú eres Kaoruko Bot. Responde con gracia, inteligencia y un tono cálido. Puedes usar emojis suaves como 🌸, ☕, 🌙, pero sin exagerar. Sé útil, reflexiva y encantadora. Nunca pierdas tu estilo ni tu voz tranquila.`;

    const apiUrl = `https://delirius-apiofc.vercel.app/ia/gptprompt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const result = await response.json();
    if (!result.status) throw new Error('La API devolvió un error.');

    const reply = result.data || '🌙 Kaoruko no ha recibido inspiración suficiente para responderte... intenta de nuevo con algo más claro.';

    await conn.sendMessage(message.chat, {
      text: reply,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363423335018677@newsletter",
          serverMessageId: '',
          newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
}
}
}, { quoted: message});

} catch (err) {
    console.error(err);
    message.reply('❎ Ocurrió un error al intentar comunicarte con 𝑲𝒂𝒐𝒓𝒖𝒌𝒐. Intenta nuevamente más tarde.');
}
};

handler.command = ['kaoruko', 'bot'];
export default handler;
