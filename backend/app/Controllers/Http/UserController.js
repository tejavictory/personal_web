'use strict'

const User = use('App/Models/User')

class UserController {
    async index ({ request, auth, response }) {
        const users = await User.all()

        response.status(200).json({
            message: 'Here are your users.',
            data: users
        })
    }

    async signup ({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password', 'firstname', 'lastname', 'role_name'])    
        try {
            const user = await User.create(userData)
            const token = await auth.generate(user)
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.' + error
            })
        }
    }

    async login ({ request, auth, response }) {
        try {
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Invalid email/password'
            })
        }
    }

    async getCourses({ request, response, params: {id} }) {
        const email = request.input('email')
        const user = await User.find(email)
        const courses = await user.courses().fetch()
        user.courses = courses
    
        response.status(200).json({
          message: 'Here are your courses.',
          data: courses
        })
    }

    async me ({ auth, response }) {
        const user = await User.query()
            .where('id', auth.current.user.id)
            .firstOrFail()
    
        return response.json({
            status: 'success',
            data: user
        })
    }

    
    async update({ request, response, params: { username } }) {
        const role_name = request.input('role_name')

        const user = await User.findBy('username',username)
        
        user.role_name = role_name
        await user.save()
    
        response.status(200).json({
          message: 'Successfully updated this user role.',
          data: user
        })
      }


}

module.exports = UserController
