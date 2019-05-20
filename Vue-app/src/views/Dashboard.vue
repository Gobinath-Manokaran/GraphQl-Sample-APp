<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex>
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              v-bind:src="patient.Profile"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">MRN : {{patient.MRN}}</h6>
            <h4 class="card-title font-weight-thin">{{patient.Name}}</h4>
            <p class="card-description profile-width font-weight-thin">Email: {{patient.email}} | DOB: {{patient.DOB}} | Phone: {{patient.mobile}}</p>
            <p class="card-description profile-width font-weight-thin">City: {{patient.city}}</p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex
        sm12
        xs12
        md12
        lg4
      >
        <material-stats-card
          color="green"
          icon="mdi-format-line-weight"
          title="Height"
          v-bind:value="patient.healthData.height"
        />
      </v-flex>
      <v-flex
        sm12
        xs12
        md6
        lg4
      >
        <material-stats-card
          color="orange"
          icon="mdi-weight-pound"
          title="Weight"
          v-bind:value="patient.healthData.weight"
        />
      </v-flex>
      <v-flex
        sm12
        xs12
        md6
        lg4
      >
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="BMI"
          value="12"
        />
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="heartRateChart.data"
          :options="heartRateChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">Heart Rate</h4>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="bloodPressureChart.data"
          :options="bloodPressureChart.options"
          :responsive-options="bloodPressureChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">Blood Pressure</h4>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="bloodGlucoseChart.data"
          :options="bloodGlucoseChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">Blood Glucose</h3>
        </material-chart-card>
      </v-flex>
      
      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Diseases"
          text=""
        >
          <v-data-table
            :headers="diseaseHeaders"
            :items="patient.diseases"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ item.ICD}}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.Type }}</td>
              <td>{{ item.Since }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
        lg6
      >
                <material-card
          color="green"
          title="Medications"
          text=""
        >
          <v-data-table
            :headers="medicationHeaders"
            :items="patient.medications"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ item.NDC }}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.dose }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
// GraphQL query
let urlParams = new URLSearchParams(window.location.search);
let patient_id = urlParams.get('id') ? urlParams.get('id') : 1
const patientsQuery = gql`
query patientsDetail {
  patient(id:${patient_id}){
    id
    Name
    DOB
    MRN
    mobile
    email
    city
    Profile
    encounters{
      Date
    }
    medications {
      id
      Name
      NDC
      dose
    }
    diseases {
      id
      Name
      Type
      Since
      ICD
    }
    healthData {
      id
      weight
      height
      heartRate
      bloodGlucose
      bloodPressure
    }
  }
}
`
export default {
  data () {
    return {
      patient : {},
      heartRateChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            []
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 250, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      bloodGlucoseChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            []
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 450, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      bloodPressureChart: {
        data: {
          labels: ['M','T','W','T','F','S','S'],
          series: [
            []

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      diseaseHeaders: [
        {
          sortable: false,
          text: 'ICD Code',
          value: 'ICD'
        },
        {
          sortable: false,
          text: 'Name',
          value: 'Name'
        },
        {
          sortable: false,
          text: 'Type',
          value: 'Type'
        },
        {
          sortable: false,
          text: 'Since',
          value: 'Since'
        }
      ],
      medicationHeaders:[
        {
          sortable: false,
          text: 'NDC',
          value: 'NDC'
        },
        {
          sortable: false,
          text: 'Name',
          value: 'Name'
        },
        {
          sortable: false,
          text: 'Frequency',
          value: 'dose'
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  },
    // Apollo GraphQL
  apollo: {
    // Local state 'items' data
    patient: {
      query: patientsQuery
    }
  },
  watch:{
    patient (){
      let heartRate = this.patient.healthData.heartRate.map((a)=> parseInt(a))
      this.heartRateChart.data.series[0] =heartRate
      this.bloodPressureChart.data.series[0] = this.patient.healthData.bloodPressure.map((a)=> parseInt(a))
      this.bloodGlucoseChart.data.series[0] = this.patient.healthData.bloodGlucose.map((a)=> parseInt(a))
    }
  }
}
</script>

<style scoped>
.profile-width{
  width: 1000px
}
</style>
