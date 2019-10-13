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
                <input type="text" data-tooltip="testing" placeholder="Codeword Set Name" v-model="csname" @change="validateName()">
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
            <div class="field" id="violations">
                <div class="ui message">
                    <label>Violations</label>
                    <ul>
                        <li>Hard rule violations: {{ this.hardcount }}</li>
                        <li>Soft rule violations: {{ this.softcount }}</li>
                        <li> SOFT RULE VIOLATIONS ARE INDICATED IN RED TEXT. You can choose to override these and create the set.</li>
                        <li> HARD RULE VIOLATIONS ARE INDICATED IN RED BACKGROUND. You cannot create a set unless you change these. </li>
                    </ul>
                </div>
            </div>
             <div class="ui stackable grid" id="grid">
            </div>
            <div class="field">
                <button class="ui button blue" v-on:click="addNew"><i class="plus icon"></i>New Codeword</button> 
            </div>
            <div class="field" >
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
        $('#violations').hide()
        $('#done').hide()
    },
    data() {
        return {
            csname: '',
            softcount: '',
            hardcount: ''
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
            $('#violations').hide()
            $('#done').hide()
            var c = document.getElementById("grid").childNodes;
            var word = "";
            var i,j;
            var words = new Array()
            var softcount = 0
            var hardcount = 0
            for (i = 0; i < c.length; i++) {
                word = c[i].childNodes[0].value;
                c[i].childNodes[0].style.color = "#000000"
                c[i].childNodes[0].style.backgroundColor = "#ffffff"
                c[i].setAttribute("data-tooltip","")
                c[i].setAttribute("data-variation","wide")
                words.push(word.toUpperCase())
            }
            for (i = 0; i < words.length - 1; i++){
                for (j = i+1; j < words.length; j++){
                    //hard rule
                    if(this.compareTwoStrings(words[i],words[j]) > 0.7){
                        document.getElementById("grid").childNodes[i].childNodes[0].style.color = "#ffffff"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ffffff"
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[i].getAttribute("data-tooltip")+"<strong>Hard rule</strong>: Word Similarity more than 70% with "+words[j]+" ")
                        document.getElementById("grid").childNodes[j].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[j].getAttribute("data-tooltip")+"Hard rule: Word Similarity more than 70% with "+words[i]+" ")
                        hardcount++
                        // console.log('Similar words: '+words[i]+', '+words[j])
                    }
                    //soft rule
                    else if(this.compareTwoStrings(words[i],words[j]) > 0.5){
                        document.getElementById("grid").childNodes[i].childNodes[0].style.color = "#ff0000"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ff0000"
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ffffff"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ffffff"  
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[i].getAttribute("data-tooltip")+"Soft rule: Tolerable word similarity with "+words[j]+" ")
                        document.getElementById("grid").childNodes[j].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[j].getAttribute("data-tooltip")+"Soft rule: Tolerable word similarity with "+words[i]+" ")
                        softcount++
                    }
                    //hard rule
                    if(this.isAnagram(words[i],words[j])){
                        // console.log('Anagrams: '+words[i]+', '+words[j])
                        document.getElementById("grid").childNodes[i].childNodes[0].style.color = "#ffffff"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.color = "#ffffff"                        
                        document.getElementById("grid").childNodes[i].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[j].childNodes[0].style.backgroundColor = "#ff0000"
                        document.getElementById("grid").childNodes[i].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[i].getAttribute("data-tooltip")+"Hard rule: Anagram with "+words[j]+" ")
                        document.getElementById("grid").childNodes[j].setAttribute("data-tooltip",
                            document.getElementById("grid").childNodes[j].getAttribute("data-tooltip")+"Hard rule: Anagram with "+words[i]+" ")
                        hardcount++
                    }
                }
            }
            if(softcount>0 || hardcount>0){
                this.softcount = softcount
                this.hardcount = hardcount
                $('#violations').show()
            }
            if(hardcount == 0){
                $('#done').show()
            }
            console.log(words)
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
        },
        compareTwoStrings(first, second) {
            // first = first.replace(/\s+/g, '')
            // second = second.replace(/\s+/g, '')

            if (!first.length && !second.length) return 1              // if both are empty strings
            if (!first.length || !second.length) return 0              // if only one is empty string
            if (first === second) return 1     				 // identical
            if (first.length === 1 && second.length === 1) return 0    // both are 1-letter strings
            if (first.length < 2 || second.length < 2) return 0			 // if either is a 1-letter string

            let firstBigrams = new Map()
            for (let i = 0; i < first.length - 1; i++) {
                const bigram = first.substring(i, i + 2)
                const count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram) + 1
                    : 1

                firstBigrams.set(bigram, count);
            }

            let intersectionSize = 0
            for (let i = 0; i < second.length - 1; i++) {
                const bigram = second.substring(i, i + 2)
                const count = firstBigrams.has(bigram)
                    ? firstBigrams.get(bigram)
                    : 0

                if (count > 0) {
                    firstBigrams.set(bigram, count - 1)
                    intersectionSize++
                }
            }

            return (2.0 * intersectionSize) / (first.length + second.length - 2);
        },
        isAnagram (str1, str2) {
            if (str1.length !== str2.length) {
                return false;
            }            
            var sortStr1 = str1.split('').sort().join('')
            var sortStr2 = str2.split('').sort().join('')
            return (sortStr1 === sortStr2);
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

    .ui.message{
        background-color: rgb(252, 228, 228);
        color: red;
    }

    #wordvalidate{
        float: right;
    }
</style>