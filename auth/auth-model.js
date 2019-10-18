const db = require('../database/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById
}

function add(user){
  return db('users')
  .insert(user)
}

function find(){
  return db('users')
}

function findBy(filter){
  return db('users')
  .where(filter)
}

function findById(id){
  return db('users')
  .where({id})
  .first()
}