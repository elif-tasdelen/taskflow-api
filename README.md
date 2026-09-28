# TASKFLOW API

Node.js ve Express.js ile geliştirilmiş görev yönetimi REST API'sidir.

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
| GET | /reports/summary | Özet rapor |
| GET | /reports/completed | Tamamlanan görevler |
| GET | /reports/pending | Bekleyen görevler |

## Filtreleme & Arama

```
GET /tasks?status=pending
GET /tasks?priority=high
GET /tasks?assignee=elif
GET /tasks?keyword=acil
GET /tasks?sort=priority
GET /tasks?page=1&limit=5
```

## Örnek İstek (POST)

```json
{
  "title": "Görev başlığı",
  "description": "Görev açıklaması",
  "priority": "high",
  "assignee": "elif"
}
```

## Kullanılan Teknolojiler

- Node.js
- Express.js
- Nodemon (geliştirme ortamı)