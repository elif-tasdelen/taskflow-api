const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

let tasks = [];
let nextId = 1;

// Tüm görevleri listele — filtreleme, arama, sayfalama destekli
router.get('/', (req, res) => {
  let result = [...tasks];

  // Duruma göre filtrele
  if (req.query.status) {
    result = result.filter(t => t.status === req.query.status);
  }

  // Önceliğe göre filtrele
  if (req.query.priority) {
    result = result.filter(t => t.priority === req.query.priority);
  }

  // Atanan kişiye göre filtrele
  if (req.query.assignee) {
    result = result.filter(t => t.assignee === req.query.assignee);
  }

  // Anahtar kelimeyle ara (title veya description içinde)
  if (req.query.keyword) {
    const kw = req.query.keyword.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(kw) ||
      t.description.toLowerCase().includes(kw)
    );
  }

  // Sıralama (createdAt = id sırasına göre, varsayılan zaten bu)
  if (req.query.sort === 'priority') {
    const order = { high: 0, medium: 1, low: 2 };
    result.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  // Sayfalama
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  res.json({ total: result.length, page, data: paginated });
});

// Tek görev getir
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Görev bulunamadı' });
  res.json(task);
});

// Yeni görev ekle
router.post('/', validate, (req, res) => {
  const { title, description, priority = 'medium', assignee = null } = req.body;
  const task = {
    id: nextId++,
    title,
    description,
    status: 'pending',
    priority,
    assignee,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Görevi güncelle
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Görev bulunamadı' });
  const { title, description, status, priority, assignee } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assignee !== undefined) task.assignee = assignee;
  res.json(task);
});

// Görevi sil
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Görev bulunamadı' });
  tasks.splice(index, 1);
  res.json({ message: 'Görev silindi' });
});
router.getTasks = () => tasks;

module.exports = router;