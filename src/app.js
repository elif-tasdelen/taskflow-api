const express = require('express');
const logger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');
const reportsRouter = require('./routes/reports');

const app = express();
const PORT = 3000;

// Gelen isteklerin body'sini JSON olarak okur
app.use(express.json());
app.use(logger);
app.use('/tasks', tasksRouter);

// Reports router'ına tasks dizisini bağla
reportsRouter.setTasks(tasksRouter.getTasks());
app.use('/reports', reportsRouter);

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`TASKFLOW API basarili: http://localhost:${PORT}`);
});