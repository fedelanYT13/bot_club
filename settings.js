/*
// ☕ Créditos a Devfedexyz 
//☕ Made by Dev-fedexyz*/

//===================[ ☕ 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 🌙 ]=====================\\*

import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botNumber = ""

// Número de owner
global.owner = ["5491156178758", "5491137612743"]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botname = '𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨'
global.namebot = '🌙 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌘'
global.bot = 'SakuraBot'
global.packname = '🌘 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 🌙'
global.wm = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨'
global.author = '🌙 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎'
global.dev = '© 𝑴𝒂𝒅𝒆 𝒃𝒚 𝑫𝒆𝒗-𝒇𝒆𝒅𝒆𝒙𝒚𝒛.'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.banner = 'https://cdn.stellarwa.xyz/files/1758842352363.jpeg'
global.icon = 'https://cdn.stellarwa.xyz/files/1758842359325.jpeg'
global.currency = 'Coins'
global.sessions = 'auth'
global.jadi = 'auth-sub'
global.namedb = 'datos.json'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.api = { 
url: 'https://api.stellarwa.xyz',
key: 'Diamond'
}

global.my = {
  ch: '120363423335018677@newsletter',
  name: '🌙 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝑨 ⚡︎',

  ch2: '120363423335018677@newsletter',
  name3: '🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
