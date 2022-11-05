const fs = require('fs').promises;
const path = require('path');

const PATH_DIR = '../talker.json';

const readTalker = async () => {
  try {
    const listTalker = await fs.readFile(path.resolve(__dirname, PATH_DIR), 'utf-8');
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
  try {
    const { name, age, talk } = obj;
    const list = await readTalker();
    const newId = list[list.length - 1].id + 1;
    const newObject = { name, age, id: newId, talk };
    const newList = JSON.stringify([...list, newObject]);
    
    await fs.writeFile(path.resolve(__dirname, PATH_DIR), newList);
    return newId;
  } catch (error) { console.log(error); }
};

const putTalkerUpdate = async (obj, id) => {
  try {
    const { name, age, talk } = obj;
    const list = await readTalker();
    const newListUpdate = list.find((e) => e.id === id);
    const newListUpdateIndex = list.findIndex((e) => e.id === id);
    
    newListUpdate.name = name;
    newListUpdate.age = age;
    newListUpdate.talk = talk;
    list.splice(newListUpdateIndex, 1, newListUpdate);
    
    const newList = JSON.stringify(list);
    
    await fs.writeFile(path.resolve(__dirname, PATH_DIR), newList);
    return newListUpdate;
  } catch (error) { console.log(error); }
};

module.exports = {
  getAllTalker,
  getAllTalkerId,
  postTalkerAdd,
  putTalkerUpdate,
};