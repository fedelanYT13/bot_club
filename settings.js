import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = ["5492916450307"]

global.botname = '🦊 SenkoBot-MD'
global.namebot = '🥗 Senko Bot'
global.bot = 'SenkoBot'
global.packname = '🦊 𝗦𝗲𝗻𝗸𝗼𝗕𝗼𝘁-𝗠𝗗'
global.wm = '🦎 𝙎𝙚𝙣𝙠𝙤𝘽𝙤𝙩-𝙈𝘿'
global.author = '🥗 DevAlexJs'
global.dev = '© Pᴏᴡᴇʀᴇᴅ Bʏ DᴇᴠAʟᴇxJs.'

global.banner = 'https://cdn.stellarwa.xyz/files/1758842352363.jpeg'
global.icon = 'https://cdn.stellarwa.xyz/files/1758842359325.jpeg'
global.currency = 'Coins'
global.sessions = 'auth'
global.jadi = 'auth-sub'
global.namedb = 'datos.json'

global.api = { 
url: 'https://api.stellarwa.xyz',
key: 'Diamond'
}

global.my = {
  ch: '120363420992828502@newsletter',
  name: '₊· ͟͟͞͞꒰ ✩ 𝐒𝐭𝐞𝐥𝐥𝐚𝐫 𝐖𝐚𝐁𝐨𝐭 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⏤͟͟͞͞✿',

  ch2: '120363203805910750@newsletter', 
  name2: '⚶ ⊹ Max Evolution𝄢 ⊹',

  ch3: '120363419837575209@newsletter',
  name3: '⚶ ⊹ Night ⚡︎ Light - Team 𝄢 ⊹'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
