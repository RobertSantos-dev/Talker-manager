const { getAllTalker } = require('../utils/requestApi');

const validationQuery = async (req, res, next) => {
  const listAll = await getAllTalker();
  const { q } = req.query;
  
  if (q === undefined || q === '') {
    return res.status(200).json(listAll);
  }

  next();
};

module.exports = validationQuery;
