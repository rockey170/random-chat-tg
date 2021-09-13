# random-chat-tg

Bot Telegram yang akan mencari teman online secara random.

bot ini dibuat dengan [NodeJS](https://nodejs.dev/) dengan memakai [telegraf](https://github.com/telegraf/telegraf) sebagai library utama.

# Konfigurasi

**PERHATIAN:**
Silahkan pasang [NodeJS](https://nodejs.dev/) di sistem operasi anda dan pastikan bisa dijalankan dengan benar sebelum melanjutkan ke tahap berikutnya!

## Clone repository

```bash
git clone https://github.com/jrdrwn/random-chat-tg.git
cd random-chat-tg # masuk ke folder utama
```

## Mengatur _botconfig.env_

Pertama ubah nama `sample_config.env` menjadi `botconfig.env`

```bash
mv sample_config.env botconfig.env
```

Setelah itu anda bisa mengisi semua variable yang ada di `botconfig.env`

## Memasang library yang dibutuhkan

Jalankan perintah dibawah ini

```bash
npm install .
```

**PERHATIAN:**
Pastikan anda terkoneksi ke internet!

# Memulai

Untuk memulainya cukup simple yaitu:

```bash
npm run start
```

**PERHATIAN:**
Jangan lupa anda harus mengirim pesan apapun itu ke bot sebelum memulainya untuk pertama kali!

# Perintah

Untuk melihat daftar perintah yang tersedia cukup kirim `/help` di botnya.

# Penutup

Oke sepertinya cukup itu saja. mohon maaf jika ada kesalahan karena mc-bot ini hanya untuk latihan saya belajar [NodeJS](https://nodejs.dev/). Jangan ragu untuk berkontribusi di repository ini.
