# TASKFLOW API

Node.js ve Express.js ile geliştirilmiş basit bir görev yönetimi REST API'sidir.

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışır.

## Endpoint'ler

| Method | URL | Açıklama |
|--------|-----|----------|
| POST | /tasks | Yeni görev oluştur |
| GET | /tasks | Tüm görevleri listele |
| GET | /tasks/:id | Belirli bir görevi getir |
| PUT | /tasks/:id | Görevi güncelle |
| DELETE | /tasks/:id | Görevi sil |

## Örnek İstek (POST)

```json
{
  "title": "Görev başlığı",
  "description": "Görev açıklaması"
}
```

## Kullanılan Teknolojiler

- Node.js
- Express.js
- Nodemon (geliştirme ortamı)