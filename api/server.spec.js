const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('./server');
const Users = require('../auth/auth-model');
const db = require('../database/dbConfig');
const secrets = require('../config/secrets');

describe('auth-model', () =>{

  beforeEach(async () =>{
    await db('users').truncate();
  })

  describe('POST /register', () =>{
    it('saves new user to db', async () =>{
      await Users.add({username: 'Harry', password: 'potter'})
      let users = await db('users')
      expect(users).toHaveLength(1)
    })

    it('returns correct username', async () =>{
      const user = await Users.add({username: 'Ginny', password: 'weasley'});
      expect(user.username).toBe('Ginny')
    })
  })

  describe('POST /login', () =>{
    it('hashes the password', async () =>{
      const user = {username: 'Ginny', password: 'weasley'}
      const hash = bcrypt.hashSync(user.password, 10)
      user.password = hash
      expect(user.password).toBe(hash)
    })

    it('returns JSON', () =>{
      return request(server)
      .post('/api/auth/login')
      .then(res =>{
        expect(res.type).toMatch(/json/i)
      })

    })
  })
})
