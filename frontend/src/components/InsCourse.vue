<template>
    <div class="column">
            <div class="ui fluid card">
                <div class="content">
                    <label>{{ course.course_name }}</label> 
                    <button class="ui icon red button" id="trash" v-on:click="delCourse">
                        <i class="trash alternate outline icon"></i>
                    </button>
                    <button class="ui icon blue button" id="edit" v-on:click="updateCourse">
                        <i class="edit outline icon"></i>
                    </button>
                     
                </div>
                <div class="content" id="temp">
                    <label> Start Date: </label> <span>{{ course.startDate }}</span><br/>
                    <label> End Date: </label> <span>{{ course.endDate }}</span><br/>
                    <label> Pre-Survey Link: </label> <span>{{ course.presurveylink }}</span><br/>
                    <label> Post-Survey Link: </label> <span>{{ course.postsurveylink }}</span><br/>
                </div>
                <div class="extra content">
                    <button class="ui blue button fluid">Distribute Codewords</button>
                </div>
            </div>
    </div> 

    
</template>

<script>
export default {
    name: 'InsCourse',
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    methods: {
        delCourse() {
            axios.post('/delcourse/'+this.course.id,{params: {id: this.course.id}
            })
            .then(response => {
                // redirect to user home
                // this.$router.push('/InsDash')
                this.$router.go()
            })
            .catch(error => { 
            })   
        },
        updateCourse() {
            this.$store.commit('changeCourse',this.course)
            // $('#editCourse').modal('show')
        }
    }    

}
</script>

<style scoped>
*{
    font-family: 'Quicksand', sans-serif;
}
label{
    font-weight: bold;
}
.ui.icon.button{
    float: right;
}
</style>