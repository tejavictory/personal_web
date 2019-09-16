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
    
        const course = await Course.create(data)
    
        // if (tags && tags.length > 0) {
        //   await project.tags().attach(tags)
        //   project.tags = await project.tags().fetch()
        // }
        await course.save()
        response.status(200).json({
            message: 'Done adding course.',
            data: course
          })
      }
    
      async show({ request, response, params: { id } }) {
        const { project } = request.post()
    
        const tags = await project.tags().fetch()
    
        project.tags = tags
    
        response.status(200).json({
          message: 'Here is your project.',
          data: project
        })
      }
    
      async update({ request, response }) {
        const data = request.only(['course_name', 'startDate', 'endDate', 'presurveylink', 'postsurveylink', 'codewordAssignStatus'])
        
        course.course_name = course_name || course.course_name
        course.startDate = startDate || course.startDate
        course.endDate = endDate || course.endDate
        course.presurveylink = presurveylink || course.presurveylink
        course.postsurveylink = postsurveylink || course.postsurveylink
        course.codewordAssignStatus = codewordAssignStatus || course.codewordAssignStatus
    
        await course.save()
    
        // if (tags && tags.length > 0) {
        //   await project.tags().detach()
        //   await project.tags().attach(tags)
        //   project.tags = await project.tags().fetch()
        // }
    
        response.status(200).json({
          message: 'Successfully updated this course.',
          data: course
        })
      }
    
      async delete({ request, response, params: { id } }) {
        const { course } = request.post()
        await course.delete()
    
        response.status(200).json({
          message: 'Successfully deleted this course.',
          deleted: true
        })
      }
}

module.exports = CourseController
