const validate = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'title alanı zorunludur' });
  }

  next();
};

module.exports = validate;