let handler = async (m, { conn}) => {
    // 📇 Tarjeta de contacto (vCard)
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;Marck Uwu;;;
FN:Marck Uwu
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Celular
END:VCARD`;

    // 💬 Mensaje de contacto simulado para citar
    const quotedContact = {
        key: {
            fromMe: false,
            participant: "13135550002@s.whatsapp.net",
            remoteJid: "status@broadcast",
},
        message: {
            contactMessage: {
                displayName: "𝖬𝗈𝗈𝗇𝖿𝗋𝖺𝗋𝖾 𝗍𝖾𝖺𝗆",
                vcard,
},
},
};

    // 📤 Enviar mensaje con imagen, botones y pie de página
    await conn.sendMessage(
        m.chat,
        {
            image: { url: "https://files.catbox.moe/gm249p.jpg"},
            caption: "👋 *Hola, bienvenidos.*\n🔗 *Visita nuestros links oficiales abajo.*\n\n*𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕*",
            title: "🌙 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 — 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎",
            subtitle: "",
            footer: "*© 2025 – 𝖬𝗈𝗈𝗇𝖿𝗋𝖺𝗋𝖾 𝗍𝖾𝖺𝗆*",
            interactiveButtons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "👥 Grupo oficial",
                        url: "https://chat.whatsapp.com/LTOMyo9JqQEGYpSHm2hVT7",
                        merchant_url: "https://chat.whatsapp.com/LTOMyo9JqQEGYpSHm2hVT7",
}),
},
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📺 Canal oficial",
                        url: "https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p",
                        merchant_url: "https://whatsapp.com/channel/0029Vb6EMjb6GcGKmVITlG2p",
}),
},
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📞 Contacto directo",
                        url: "https://wa.me/5491137612743",
                        merchant_url: "https://wa.me/5491137612743",
}),
},
            ],
            hasMediaAttachment: true,
},
        { quoted: quotedContact}
);
};

handler.help = ["links", "grupos"];
handler.tags = ["info"];
handler.command = ["links", "grupos"];

export default handler;
