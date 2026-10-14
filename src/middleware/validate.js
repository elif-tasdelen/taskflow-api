const VALID_PRIORITIES = ['low', 'medium', 'high'];

const validate = (req, res, next) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'title alanı zorunludur' });
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({
      message: `priority geçersiz. Geçerli değerler: ${VALID_PRIORITIES.join(', ')}`
    });
  }

  next();
};

module.exports = validate;
