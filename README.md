# 🦷 pH Checker Harian - Aplikasi Praktis Kesehatan Gigi Sehari-hari

## Fitur
- **API Terstruktur**: Data dari `data.json` dimuat async (fetch)
- **UI Modern**: Responsive grid, animasi halus, dark/light mode, search/filter
- **Detail Item**: pH bar animasi, indikator warna, modal info lengkap (12+ item)
- **Quiz Canggih**: 5 pertanyaan random, confetti, leaderboard dengan localStorage (nama/kelas)
- **Aksesibilitas**: Keyboard nav, ARIA labels
- **PWA Ready**: Loading states, offline fallback

## Cara Jalankan
1. Buka `index.html` di browser (Live Server atau drag ke Chrome)
2. Cari item, klik card → lihat result + modal
3. Theme toggle, quiz → input nama/kelas untuk leaderboard

## Struktur Project
```
.
├── index.html     # App shell
├── data.json      # API data (edit untuk tambah item)
├── css/style.css  # Styles modern
├── js/
│   ├── main.js    # Entry point
│   ├── api.js     # Fetch/filter data
│   ├── ui.js      # Render UI/modal
│   └── quiz.js    # Quiz logic
└── TODO.md        # Progress tracker
```

## Kontribusi
Edit `data.json` untuk item baru. Kontak: [nama] [kelas]
