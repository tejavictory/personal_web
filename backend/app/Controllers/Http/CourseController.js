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
        
        // const tags = await project.tags().fetch()
    
        // project.tags = tags
    
        response.status(200).json({
          message: 'Here is your course.',
          data: course
        })
      }
    
      async update({ request, response, params }) {
        const data = request.all()

        let course = Course.find(params.id)
        
        course.course_name = data.course_name || course.course_name
        course.startDate = data.startDate || course.startDate
        course.endDate = data.endDate || course.endDate
        course.presurveylink = data.presurveylink || course.presurveylink
        course.postsurveylink = data.postsurveylink || course.postsurveylink
        course.codewordAssignStatus = data.codewordAssignStatus || course.codewordAssignStatus
    
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
    

}

module.exports = CourseController
