const express = require('express');
const router = express.Router();

/* tasks dizisine erişmek için tasks router'ından değil,
// ortak bir yerden almak gerekir şimdilik tasks.js'den import edeceğiz
// Ama in-memory array paylaşılamaz, bu yüzden burada ayrı tutuyoruz.
 Gerçek projede database olurdu bu pratik amaçlıdır.*/

let sharedTasks = null;

router.setTasks = (tasksRef) => {
  sharedTasks = tasksRef;
};

// Tamamlanan görevler
router.get('/completed', (req, res) => {
  const completed = sharedTasks.filter(t => t.status === 'completed');
  res.json({ count: completed.length, tasks: completed });
});

// Bekleyen görevler
router.get('/pending', (req, res) => {
  const pending = sharedTasks.filter(t => t.status === 'pending');
  res.json({ count: pending.length, tasks: pending });
});

// Genel özet
router.get('/summary', (req, res) => {
  const total = sharedTasks.length;
  const completed = sharedTasks.filter(t => t.status === 'completed').length;
  const pending = sharedTasks.filter(t => t.status === 'pending').length;
  const high = sharedTasks.filter(t => t.priority === 'high').length;

  res.json({ total, completed, pending, highPriority: high });
});

module.exports = router;