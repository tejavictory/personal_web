<template>
    <div class="ui modal">
        <i class="close icon"></i>
        <div class="header">
            Add a New Course
        </div>
        <div class="ui form" @submit.prevent="createCourse">
            <div class="fields">
                <div class="field">
                <label>Course Name</label>
                <input type="text" placeholder="Course Name" v-model="cname">
                </div>
                <div class="field">
                <label>Start Date</label>
                    <div class="ui calendar" id="startdate_calendar">
                        <div class="ui input left icon">
                            <i class="calendar icon"></i>
                            <input type="text" placeholder="Start Date" v-on:click="startdatepick" v-model="cstartdate">
                        </div>
                    </div>
                </div>
                <div class="field">
                <label>End Date</label>
                    <div class="ui calendar" id="enddate_calendar">
                        <div class="ui input left icon">
                            <i class="calendar icon"></i>
                            <input type="text" placeholder="Start Date" v-on:click="enddatepick" v-model="cenddate">
                        </div>
                    </div>
                </div>
            </div>
            <div class="fields">
                <div class="field">
                <label>Pre-Survey Link</label>
                <input type="text" placeholder="Pre-Survey Link" v-model="cpresurvey">
                </div>
                <div class="field">
                <label>Post-Survey Link</label>
                <input type="text" placeholder="Post-Survey Link" v-model="cpostsurvey">
                </div>      
            </div>
            <div class="fields">
                <div class="field">
                    <label> Add Students to the Course </label>
                    <div class="ui left icon input">
                        <input type="text" placeholder="Add Students..." v-model="cstudents">
                        <i class="users icon"></i>
                    </div>                    
                </div>      

                <div class="field">
                    <label> Upload a CSV file instead </label>
                    <input type="file" placeholder="File Upload">
                </div>
            </div>
        </div>
        <div class="actions">
            <div class="ui black deny button">
            Cancel
            </div>
            <div class="ui positive right labeled icon button" v-on:click="createCourse">
            Done
            <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseModal',
    data() {
        return {
            cname: '',
            cstartdate: '',
            cenddate: '',
            cpresurvey: '',
            cpostsurvey: '',
            cassignstat: '',
            cstudents: ''
        }
    },
    methods: {
        startdatepick: function () {
            $('#startdate_calendar').calendar({type:'date'})
        },
        enddatepick: function () {
            $('#enddate_calendar').calendar({type:'date'})
        },
        createCourse() {
            axios.post('/coursecreate',{
                course_name: this.cname,
                startDate: this.cstartdate,
                endDate: this.cenddate,
                presurveylink: this.cpresurvey,
                postsurveylink: this.cpostsurvey,
                codewordAssignStatus: this.cassignstat
            })
            .then(response => {
                // redirect to user home
                this.$router.push('/')
            })
            .catch(error => {
                // clear form inputs
                this.cname = error
            })            
        }
    }
}
</script>

<style scoped>
    .ui.form{
        padding: 20px;
    }

    .field{
        padding: 10px;
    }
</style>