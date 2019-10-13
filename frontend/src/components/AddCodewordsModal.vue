<template>
    <div class="ui modal" id="createSet">
        <i class="close icon"></i>
        <div class="header">
            Add a New Codeword Set
        </div>
        <div class="ui form" @submit.prevent="createSet">
            <div class="fields">
                <div class="field">
                <label>Codeword Set Name</label>
                <input type="text" placeholder="Codeword Set Name" v-model="csname" @change="validateName()">
                </div>
                <div class="field" id="nameerr">
                    <label></label>
                        <i class="close icon red"></i>Name is not available
                </div>
                <div class="field" id="validname">
                    <label></label>
                        <i class="check icon green"></i>Name is available
                </div>
            </div>
             <div class="ui stackable grid" id="grid">
            </div>
            <div class="field">
                <button class="ui button blue" v-on:click="addNew"><i class="plus icon"></i>New Codeword</button> 
            </div>
            <div class="field">
                <button class="ui button blue" v-on:click="validateWords"><i class="check icon"></i>Validate Codewords</button> 
            </div>
        </div>
        <div class="actions">
            <div class="ui black deny button">
            Cancel
            </div>
            <div class="ui positive right labeled icon button" id="done" v-on:click="createSet">
            Done
            <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseModal',
    mounted() {
        $('#nameerr').hide()
        $('#validname').hide()
    },
    data() {
        return {
            csname: '',
            cstartdate: '',
            cenddate: '',
            cpresurvey: '',
            cpostsurvey: '',
            cassignstat: '',
            cstudents: [],
            insEmail: '',
            sets: '',
        }
    },
    methods: {
        validateName() {
            axios.get('/isUniqueName/'+this.csname,{                
            })
            .then(response => {
                if(response.data.data==null){
                    $('#nameerr').hide()
                    $('#validname').show()
                }
                else{
                    $('#validname').hide()
                    $('#nameerr').show()
                }
                // redirect to user home
            })
            .catch(error => {
                // clear form inputs
                $('#nameerr').hide()
                $('#validname').show()
            })
        },
        addNew: function(){
            var node = document.createElement("div");
            node.className = "four wide column"
            var textnode = document.createElement("input");
            node.appendChild(textnode);
            document.getElementById("grid").appendChild(node);
        },
        validateWords() {
            var c = document.getElementById("grid").childNodes;
            var word = "";
            var i;
            for (i = 0; i < c.length; i++) {
                word = c[i].childNodes[0].value;
                console.log(word)
            }
        },
        formatStudents: function () {
        },
        startdatepick: function () {
            $('#startdate_calendar').calendar({type:'date'})
        },
        enddatepick: function () {
            $('#enddate_calendar').calendar({type:'date'})
        },
        createSet: function() {

        },
        createCourse() {
            axios.post('/coursecreate',{
                course_name: this.cname,
                startDate: this.cstartdate,
                endDate: this.cenddate,
                presurveylink: this.cpresurvey,
                postsurveylink: this.cpostsurvey,
                codewordAssignStatus: this.cassignstat,
                insEmail: this.$store.getters.useremail || localStorage.getItem('useremail'),
                users: sessionStorage.getItem('addstu').split(',')
            })
            .then(response => {
                // redirect to user home
                this.$router.go()
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