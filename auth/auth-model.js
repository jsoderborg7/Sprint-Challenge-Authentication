const db = require('../database/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById
}

function add(user){
  return db('auth')
  .insert(user)
}

function find(){
  return db('auth')
}

function findBy(filter){
  return db('auth')
  .where(filter)
}

function findById(id){
  return db('auth')
  .where({id})
  .first()
}