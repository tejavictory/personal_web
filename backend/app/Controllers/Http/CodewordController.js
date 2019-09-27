'use strict'

const Codeword = use('App/Models/Codeword')

class CodewordController {
    async index({ response }) {
        const codewords = await Codeword.all()
    
        response.status(200).json({
          message: 'Here are your codewords.',
          data: codewords
        })
    }

    async store({ request, response }) {
        const data = request.only(['codeword'])
        const codeword = await Codeword.create(data)
        await codeword.save()

        // if (users && users.length > 0) {
        //   await course.users().attach(users)
        //   course.users = await course.users().fetch()
        // }
        response.status(200).json({
            message: 'Done adding codeword.',
            data: codeword
        })
      }
}

module.exports = CodewordController
