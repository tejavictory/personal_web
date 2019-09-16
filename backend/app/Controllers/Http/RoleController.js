'use strict'

const Role = use('App/Models/Role')

class RoleController {
    async rolecreate ({ request, response }) {
        const role = new Role()
        role.role_name = request.input('role_name')
        await role.save()
        response.status(200).json({
            message: 'Done adding role.',
            data: role
          })
    }
}

module.exports = RoleController
