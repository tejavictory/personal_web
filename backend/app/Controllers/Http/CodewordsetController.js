'use strict'

const Codewordset = use('App/Models/Codewordset')

class CodewordsetController {
    async store({ request, response }) {
        const data = request.only(['name', 'creator', 'type'])
        const codewords = request.input('codewords')
        const codewordset = await Codewordset.create(data)
        await codewordset.save()

        if (codewords && codewords.length > 0) {
          await codewordset.codewords().attach(codewords)
          codewordset.codewords = await codewordset.codewords().fetch()
        }
        response.status(200).json({
            message: 'Done adding codewordset.',
            data: codewordset
          })
      }
}

module.exports = CodewordsetController
