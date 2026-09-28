const logger = (req, res, next) => {
  const method = req.method;        // gelen isteğin türü (CRUD)
  const endpoint = req.url;         
  const timestamp = new Date().toISOString(); 

  console.log(`[${timestamp}] ${method} ${endpoint}`);

  next(); 
};

module.exports = logger;