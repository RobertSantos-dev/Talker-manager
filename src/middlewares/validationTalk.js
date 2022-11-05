const validationTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }

  next();
};

const validationTalkWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const validationDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!validationDate.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const validationTalkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const cond = [rate > 5, rate < 1, !Number.isInteger(rate)];
  if (!rate || rate === '') {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (cond.some((e) => e)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  validationTalk,
  validationTalkWatchedAt,
  validationTalkRate,
};