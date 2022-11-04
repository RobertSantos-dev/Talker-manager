const fs = require('fs').promises;
const path = require('path');

const readTalker = async () => {
  try {
    const listTalker = await fs.readFile(path.resolve(__dirname, '../talker.json'), 'utf-8');
    return JSON.parse(listTalker);
  } catch (error) {
    return null;
  }
};

const getAllTalker = async () => {
  const list = await readTalker();
  return list;
};

const getAllTalkerId = async (id) => {
  const list = await readTalker();
  const listId = list.filter((e) => e.id === Number(id));

  return listId;
};

const postTalkerAdd = async (obj) => {
  const list = await readTalker();
  const newList = [...list, obj];

  return newList;
};

module.exports = {
  getAllTalker,
  getAllTalkerId,
  postTalkerAdd,
};