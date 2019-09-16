'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCourseSchema extends Schema {
  up () {
    this.create('user_course', (table) => {
      table.increments()
      table.integer('user_id').unsigned().index('user_id')
      table.integer('course_id').unsigned().index('course_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.foreign('course_id').references('courses.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('user_course')
  }
}

module.exports = UserCourseSchema
