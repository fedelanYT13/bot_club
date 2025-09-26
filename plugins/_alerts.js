import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
const { default: WAMessageStubType} = await import('@whiskeysockets/baileys')

const namebot = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
const dev = '𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛'
const icon = 'https://files.catbox.moe/gm249p.jpg'
const redes = 'Whatsapp.com'

const groupMetadataCache = new Map()
const lidCache = new Map()

let handler = m => m

handler.before = async function (m, { conn, participants, groupMetadata}) {
    if (!m.messageStubType ||!m.isGroup) return

    const chat = globalThis.db.data.chats[m.chat]
    const userJid = m.messageStubParameters[0]
    const realSender = await resolveLidToRealJid(m?.sender, conn, m?.chat)

    const userTag = `@${userJid.split('@')[0]}`
    const senderTag = `@${realSender.split('@')[0]}`

    const fakeContext = {
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363423335018677@newsletter",
                serverMessageId: '',
                newsletterName: "🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽"
},
            externalAdReply: {
                title: namebot,
                body: dev,
                mediaUrl: null,
                description: null,
                previewType: "PHOTO",
                thumbnailUrl: icon,
                sourceUrl: redes,
                mediaType: 1,
                renderLargerThumbnail: false
}
}
}

    const promotedMsg = {
        text: `☕ ${userTag} ha sido *promovido a Administrador* por ${senderTag}`,
        mentions: [userJid, realSender],
...fakeContext
}

    const demotedMsg = {
        text: `🌙 ${userTag} ha sido *degradado de Administrador* por ${senderTag}`,
        mentions: [userJid, realSender],
...fakeContext
}

    // Eliminar sesiones si se detecta un cambio
    if (chat.detect && m.messageStubType === 2) {
        const uniqid = (m.isGroup? m.chat: m.sender).split('@')[0]
        const sessionPath = `./${sessions}/`

        for (const file of await fs.readdir(sessionPath)) {
            if (file.includes(uniqid)) {
                await fs.unlink(path.join(sessionPath, file))
                console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
}
}
}

    // Alertas de promoción y degradación
    if (chat.alerts) {
        if (m.messageStubType === 29) {
            await conn.sendMessage(m.chat, promotedMsg, { quoted: null})
            return
}

        if (m.messageStubType === 30) {
            await conn.sendMessage(m.chat, demotedMsg, { quoted: null})
            return
}
}

    // Log de otros tipos de eventos
    if (m.messageStubType!== 2) {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType],
})
}
}

export default handler

/**
 * Resuelve un JID con sufijo @lid al JID real del participante
 */
async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
    const inputJid = lid.toString()

    if (!inputJid.endsWith("@lid") ||!groupChatId?.endsWith("@g.us")) {
        return inputJid.includes("@")? inputJid: `${inputJid}@s.whatsapp.net`
}

    if (lidCache.has(inputJid)) {
        return lidCache.get(inputJid)
}

    const lidToFind = inputJid.split("@")[0]
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const metadata = await conn?.groupMetadata(groupChatId)
            if (!metadata?.participants) throw new Error("No se obtuvieron participantes")

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue
                    const contactDetails = await conn?.onWhatsApp(participant.jid)
                    if (!contactDetails?.[0]?.lid) continue

                    const possibleLid = contactDetails[0].lid.split("@")[0]
                    if (possibleLid === lidToFind) {
                        lidCache.set(inputJid, participant.jid)
                        return participant.jid
}
} catch {
                    continue
}
}

            lidCache.set(inputJid, inputJid)
            return inputJid

} catch {
            if (++attempts>= maxRetries) {
                lidCache.set(inputJid, inputJid)
                return inputJid
}
            await new Promise(resolve => setTimeout(resolve, retryDelay))
}
}

    return inputJid
}
