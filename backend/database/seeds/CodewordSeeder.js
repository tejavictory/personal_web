'use strict'

/*
|--------------------------------------------------------------------------
|  codewordSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class  codewordSeeder {
  async run () {
    const  codewords = [
      {
         codeword: "ALERT"
      },
      { codeword: "ALARM"},
      { codeword: "BEARD"},
      { codeword: "INSERT"},
      { codeword: "DELETE"},
      { codeword: "REVOKE"},
      { codeword: "VANISH"},
      { codeword: "PROMISE"},
      { codeword: "WORLD"},
      { codeword: "ORIGIN"},
      { codeword: "LARGE"},
      { codeword: "CIRCLE"},
      { codeword: "CAPTURE"},
      { codeword: "MONEY"},
      { codeword: "SPEECH"},
      { codeword: "WRITE"},
      { codeword: "SMALL"},
      { codeword: "PRISON"},
      { codeword: "PERSON"},
      { codeword: "MODERN"},
      { codeword: "ONLINE"},
      { codeword: "SOURCE"},
      { codeword: "GRADE"},
      { codeword: "SEARCH"},
      { codeword: "SHARE"},
      { codeword: "ACCOUNT"},
      { codeword: "PENCIL"},
      { codeword: "ERASER"},
      { codeword: "APPLE"}
    ]

    await Database.insert(codewords).into('codewords')
    console.log('Seeded Codewords Data')
  }
}

module.exports =  codewordSeeder
