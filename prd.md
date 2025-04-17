 Product Requirements Document (prd.md)
📌 Overview
Project Name: Quirky Schoolbound RPG

Genre & Style: Turn‑based RPG with EarthBound‑inspired art, humor, and modern‑tech quirks 
YouTube
.

Platform: Web browser (desktop/mobile), front end on Vercel 
YouTube
; backend on Render with Node.js/Express and MongoDB Atlas 
Cloud Application Platform | Render
.

Scope: ~5 hours of gameplay, 100 unique enemies, 4 playable characters, 9 explorable areas, 8 mid‑bosses + 1 final boss.

🎯 Goals
Deliver an approachable RPG “school meets tech” world with EarthBound‑style charm.

Provide fully‑balanced combat for 100 varied enemies across five roles.

Ensure dynamic, unique NPC dialogue via OpenAI’s ChatGPT API on each interaction 
Reddit
.

Achieve seamless deployment: static assets on Vercel and backend services on Render.

🗂️ Technical Architecture
Frontend (Vercel)
Backend (Render)
Stack: Node.js, Express.js, MongoDB Atlas (hosted as a private service with daily snapshots) 
Cloud Application Platform | Render

.

APIs:

/auth: user login/register

/savegame: save/load player progress

/npc/dialogue: proxy to OpenAI API for dynamic lines

/battle: compute enemy AI turns & outcomes

Deployment: Git‑driven auto‑deploy on Render (free TLS, auto‑scaling) 
Medium
.

Front End (Vercel + Kaboom.js)
Framework: Kaboom.js for 2D game loop, sprites, input, and scene management 
YouTube
.

Hosting: Vercel serves webpack‑bundled static files via global CDN 
YouTube
.

Audio: Howler.js for BGM loops, SFX, and spatial audio support 
Howler.js
.

🎨 Art & Asset Pipeline
Map Editing: Tiled for orthogonal, multi‑layer maps with object layering 
YouTube
.

Sprite Atlases: TexturePacker to pack characters, enemies, tiles into optimized sheets with JSON metadata 
CodeAndWeb
.

Asset Sources: Free pixel art from OpenGameArt.org and itch.io; custom ChatGPT‑generated placeholders as needed.

🕹️ Core Gameplay Features
Turn‑Based Combat: EarthBound‑style menu UI with HP/PP bars, status icons, and action commands.

Characters:

Four protagonists, each with archetyped stats (Strength, Dexterity, Constitution, Intellect, Charm) and unique abilities 
Reddit
.

Trade‑off design: offensive vs. defensive vs. utility roles per character 
Know Direction
.

Enemies:

100 enemies divided into Grunt, Tank, Sniper, Swarm, Leader roles.

Each enemy has distinct HP, damage range, resistances, and AI patterns (target‑prioritization, status infliction) 
Reddit
.

Areas & NPCs:

Nine themed hubs (e.g., Science Wing, Gymnasium, Cafeteria Tech Lab), each with side‑quests, shops, and NPCs.

Eight area bosses + one final boss with multi‑phase mechanics.

NPC dialogue fetched at runtime via our /npc/dialogue endpoint, powered by ChatGPT API 
The Verge
.

Inventory & Items:

Consumables, equipment, and craftable “gadget” items with status effects and tech twists.

📑 Data Models
js
Copy
// models/Enemy.js
{
  name: String,
  role: String, // e.g. "Tank"
  stats: { hp: Number, atk: Number, def: Number, spd: Number, res: Number },
  abilities: [String],
  aiPattern: String, // e.g. "prioritize-lowest-hp"
}

// models/Character.js
{
  name: String,
  archetype: String, // e.g. "Tech Mage"
  stats: {...},
  abilities: [...],
  weaknesses: [...]
}

// models/NPC.js
{
  name: String,
  area: String,
  dialogueSeed: String
}