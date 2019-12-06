<template>
  <div class="ui container" id="editCourse">
    <div class="header" style="font-family: 'Quicksand', sans-serif;">
      <h2 style="font-family: 'Quicksand', sans-serif;">Edit Course: {{ course.course_name }}</h2>
    </div>
    <div class="ui segment">
      <div class="ui stackable grid">
        <div class="seven wide column">
          <div class="ui form" @submit.prevent="updateCourse">
            <!-- <div class="fields">
                <div class="field">
                <label>Course Name:
                {{ course.course_name }}</label>
                </div>               
            </div>-->
            <div class="fields">
              <div class="field">
                <label>Start Date</label>
                <div class="ui calendar" id="rangestart">
                  <div class="ui input left icon">
                    <i class="calendar icon"></i>
                    <input
                      type="text"
                      v-model="course.startDate"
                      style="font-family: 'Quicksand', sans-serif;"
                    />
                  </div>
                </div>
              </div>
              <div class="field">
                <label>End Date</label>
                <div class="ui calendar" id="rangeend">
                  <div class="ui input left icon">
                    <i class="calendar icon"></i>
                    <input
                      type="text"
                      v-model="course.endDate"
                      style="font-family: 'Quicksand', sans-serif;"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="fields">
              <div class="field">
                <label>Pre-Survey Link</label>
                <input
                  type="text"
                  v-bind:placeholder="course.presurveylink"
                  id="pre"
                  v-model="cpresurvey"
                  style="font-family: 'Quicksand', sans-serif;"
                />
              </div>
              <div class="field">
                <label>Post-Survey Link</label>
                <input
                  type="text"
                  v-bind:placeholder="course.postsurveylink"
                  id="post"
                  v-model="cpostsurvey"
                  style="font-family: 'Quicksand', sans-serif;"
                />
              </div>
            </div>
            <div class="fields">
              <!-- <div class="field">
              <label>Add Students to the Course</label>
              <div class="ui left icon input">
                <input
                  type="text"
                  placeholder="Add Students..."
                  style="font-family: 'Quicksand', sans-serif;"
                />
                <i class="users icon"></i>
              </div>
              </div>-->

              <div class="field">
                <label>Upload a CSV file containing students emails</label>
                <input
                  type="file"
                  id="fileUpload"
                  placeholder="CSV File Upload"
                  accept=".csv"
                  v-on:change="upload"
                  style="font-family: 'Quicksand', sans-serif;"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="four wide column" style="color:green;font-weight:bold;" id="upcomingcolumn">
          <strong>To be Updated Students List</strong>
          <div class="ui segment" >
            <ol style="height:100%;overflow:scroll;" id="upcominglist">
              <!-- <li v-for="user in cstudents" :key="user" :user="user">{{ user }}</li> -->
            </ol>
          </div>
        </div>
        <div class="four wide column">
          <strong>Existing Students List</strong>
          <div class="ui segment">
            <ol style="height:100%;overflow:scroll;">
              <li v-for="user in course.users" :key="user.email" :user="user">{{ user.email }}</li>
            </ol>
          </div>
        </div>
      </div>
        <div class="actions">
          <!-- <div class="ui black deny button">Cancel</div> -->
          <div class="ui positive right labeled icon fluid button" v-on:click="updateCourse">
            Save
            <i class="checkmark icon"></i>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCourse",
  data() {
    return {
      course: "",
      cname: "",
      cstartdate: "",
      cenddate: "",
      cpresurvey: "",
      cpostsurvey: "",
      cassignstat: "",
      cstudents: ""
    };
  },
  mounted() {
      $("#upcomingcolumn").hide()
    $("#rangestart").calendar({
      type: "date",
      endCalendar: $("#rangeend"),
      onChange: function(date, text) {
        sessionStorage.setItem("start", text);
      },
      popupOptions: {
        observeChanges: false
      }
    });
    $("#rangeend").calendar({
      type: "date",
      startCalendar: $("#rangestart"),
      onChange: function(date, text) {
        sessionStorage.setItem("end", text);
      },
      popupOptions: {
        observeChanges: false
      }
    });
    this.getCourse();
  },
  methods: {
    startdatepick: function() {
      $("#startdate_calendar").calendar({ type: "date" });
    },
    enddatepick: function() {
      $("#enddate_calendar").calendar({ type: "date" });
    },
    upload: function(evt) {
      var prevemails = [],
        i = 0;

      for (i = 0; i < this.course.users.length; i++) {
        prevemails.push(this.course.users[i].email);
      }
      sessionStorage.setItem("prevusers", prevemails);
      var CSV = require("csv-string");

      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;
        data = CSV.parse(csvData);
        if (data && data.length > 0) {
          console.log(data[0]);
          this.cstudents = data[0];
          var x = 0;
          var re = /\S+@\S+\.\S+/;

          for (x = 0; x < this.cstudents.length; x++) {
            if (!re.test(this.cstudents[x])) {
              this.cstudents.splice(x, 1);
            }
          }
          console.log(this.cstudents);
          $("#upcomingcolumn").show()
          for (x = 0; x < this.cstudents.length; x++){
              $("#upcominglist").append('<li>'+this.cstudents[x]+'</li>')
          }
          sessionStorage.setItem("addstu", data[0]);
        } else {
          alert("No data to import!");
        }
      };
      reader.onerror = function() {
        alert("Unable to read " + file.fileName);
      };
    },
    updateCourse() {
      axios
        .put("/courseupdate/" + this.course.id, {
          startDate: sessionStorage.getItem("start"),
          endDate: sessionStorage.getItem("end"),
          presurveylink: this.cpresurvey,
          postsurveylink: this.cpostsurvey,
          users: sessionStorage.getItem("addstu").split(",")
        })
        .then(response => {
          // redirect to user home
          $("body").toast({
            displayTime: 5000,
            class: "success",
            message: "Course Updated"
          });
          this.$router.go();
        })
        .catch(error => {
          $("body").toast({
            displayTime: 5000,
            class: "error",
            message: "Cannot update course - Students not in database."
          });
          console.log(error);
          axios
            .put("/courseupdate/" + this.course.id, {
              startDate: sessionStorage.getItem("start"),
              endDate: sessionStorage.getItem("end"),
              presurveylink: this.cpresurvey,
              postsurveylink: this.cpostsurvey,
              users: sessionStorage.getItem("prevusers").split(",")
            })
            .then(response => {
              this.$router.go();
            })
            .catch(error => {
              console.log("pulka" + error);
            });
          // clear form inputs
        });
    },
    getCourse() {
      axios
        .post("/showcourse/" + sessionStorage.getItem("editcourse"), {})
        .then(response => {
          this.course = response.data.data;
          this.cname = this.course.course_name;
          this.cstartdate = this.course.startDate;
          this.cenddate = this.course.endDate;
          this.cpresurvey = this.course.presurveylink;
          this.cpostsurvey = this.course.postsurveylink;
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped>
.ui.form {
  padding: 20px;
}
.ui.segment{
    background-color: #ecfff9; 
}
.field {
  padding: 10px;
}
</style>