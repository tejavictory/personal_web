'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.post('/rolecreate', 'RoleController.rolecreate')
Route.post('/coursecreate', 'CourseController.store')
Route.post('/delcourse/:id', 'CourseController.destroy')
Route.post('/showcourse/:id', 'CourseController.show')
Route.get('/courses', 'CourseController.index')
Route.put('/courseupdate/:id', 'CourseController.update')

Route.get('/usercourses', 'UserController.getCourses')

