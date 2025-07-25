# 🌍 WikiLango — Explore the Languages of the World

WikiLango is an interactive web application that allows users to explore the languages and dialects spoken around the world. It provides a clickable map interface where users can listen to, view, and contribute voice recordings and words in different languages, tied to specific geographic locations.

## 🧠 Concept

Inspired by the idea of preserving linguistic and cultural diversity, VoiceMap gives people the ability to:

- Click on a country or region on the world map
- Hear local pronunciations and dialects
- Submit their own audio or written contributions
- Build a community-powered linguistic archive

---

## 🚀 Technologies Used

| Layer       | Tech Stack                                      |
|-------------|--------------------------------------------------|
| Frontend    | react, taliwindcss , JavaScript (Leaflet.js, Vanilla TS)   |
| Backend     | Node.js, Express.js, Brycript, Express js common js TypeScript                  |
| Database    | MongoDB Atlas                                    |
| Geodata     | GeoJSON (Country boundaries from open data sets) |

 
 
 
## 🌐 Features

- Interactive Leaflet.js map with country polygon layers
- Popup form to submit:
  - A word or phrase
  - An audio recording (e.g., of pronunciation)
  - Language spoken
  - Optional name and location metadata
- Real-time submission to backend
- MongoDB storage of:
  - Audio file links (e.g., via S3 or local storage)
  - Text submissions and country code
- Basic validation and upload progress
- Admin interface (coming soon)

---

## 📂 Project Structure

wikilango/
├── client/ # Frontend assets
│ ├── index.html # Map interface + splash
│ ├──Taliwindcss#  UI styling
│ └── map.js # Leaflet map logic
├── server/ # Backend Node.js + Express + TS
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── app.ts # Main Express app
├── public/ 
├── .env # Environment variables (Mongo URI, etc.)
├── tsconfig.json # TypeScript config
└── README.md

yaml
Copy
Edit

---

## 🛠 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/voicemap.git
cd voicemap
pnpm install
PORT=5000
MONGODB_URI=mongodb+srv://juniahsolo01:<WLrPPsYL7rwCLV1U@cluster0.5o99ryu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
pnpm run build
pnpm run start
npx serve client
```

## 📦 Dependencies                 
```bash
pnpm install
```
{
  country: "KE",
  language: "Swahili",
  phrase: "Habari",
  audioUrl: "https://your-s3-bucket/abc123.mp3",
  contributorName: "Jane Doe",
  submittedAt: ISODate
}


 APIs (Express Endpoints)
POST /api/submissions
Submit a word/voice contribution

Request Body (FormData):

ini
Copy
Edit
country=NG
language=Hausa
phrase=Ina kwana
audio=File (MP3)
GET /api/submissions/:country
Get all contributions for a specific country.

🧩 To Do (Roadmap)
 User authentication (OAuth or email)

 Admin dashboard to moderate uploads

 Support for dialect-level mapping

 Audio waveform preview

 AI-powered transcription / translation

 Map clustering for dense contributions

🎙️ Contributing
Contributions are welcome! If you're a linguist, a native speaker, or just curious about preserving languages, feel free to open an issue or submit a PR.







