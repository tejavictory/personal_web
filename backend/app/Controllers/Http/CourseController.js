'use strict'

const Course = use('App/Models/Course')

class CourseController {
    async index({ response }) {
        const courses = await Course.all()
    
        response.status(200).json({
          message: 'Here are your courses.',
          data: courses
        })
      }
    
      async store({ request, response }) {
        const data = request.only(['course_name', 'startDate', 'endDate', 'presurveylink', 'postsurveylink', 'codewordAssignStatus'])
        const users = request.input('users')
        const course = await Course.create(data)
        await course.save()
        // const { course_name, startDate, endDate, presurveylink, postsurveylink, codewordAssignStatus, users } = request.post()
        // const course = await Course.create({ course_name, startDate, endDate, presurveylink, postsurveylink, codewordAssignStatus })

        if (users && users.length > 0) {
          await course.users().attach(users)
          course.users = await course.users().fetch()
        }
        response.status(200).json({
            message: 'Done adding course.',
            data: course
          })
      }

      async destroy({ request, response, params: { id } }) {
        // await Course.find(request.input('name')).delete()
        const course = await Course.find(id)
        course.delete()
        response.status(200).json({
          message: 'Successfully deleted this course.',
          data: course
        })
      }
    
      async show({ request, response, params: { id } }) {
        const course = await Course.find(id)
    
        const users = await course.users().fetch()
    
        course.users = users
    
        response.status(200).json({
          message: 'Here is your course.',
          data: course
        })
      }
    
      async update({ request, response, params: { id } }) {
        const data = request.post()

        var course = Course.find(id)
        
        course.course_name = data.course_name
        course.startDate = data.startDate
        course.endDate = data.endDate
        course.presurveylink = data.presurveylink
        course.postsurveylink = data.postsurveylink
        course.codewordAssignStatus = data.codewordAssignStatus
        await course.save()
    
        if (users && users.length > 0) {
          await course.users().detach()
          await course.users().attach(users)
          course.users = await course.users().fetch()
        }
    
        response.status(200).json({
          message: 'Successfully updated this course.',
          data: course
        })
      }
    

}

module.exports = CourseController
