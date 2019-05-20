<template>
    <v-layout wrap>
      <v-flex class='mobile-padding'>
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
            <p class=" profile-width font-weight-thin">Email: {{patient.email}}</p>
            <p class="profile-width font-weight-thin">DOB: {{patient.DOB}}</p>
            <p class=" profile-width font-weight-thin">Phone: {{patient.mobile}}</p>
            <p class=" profile-width font-weight-thin">City: {{patient.city}}</p>
          </v-card-text>
        </material-card>
        <a v-bind:href = '"/mobilemedications?id=" + patient.id'>
            View Medications
        </a>
    </v-flex>
    <a v-bind:href= '"/mobile?id=" + patient.id'>Back</a>
 </v-layout>
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
    }
}
`
export default {
  data () {
    return {
      patient : {}
    }
  },
  apollo: {
    // Local state 'items' data
    patient: {
      query: patientsQuery
    }
  },
}
</script>

<style scoped>
.mobile-padding{
    padding:30px;
}
</style>
