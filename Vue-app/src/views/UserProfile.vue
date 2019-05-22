<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <material-card color="green" title="Edit Profile">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field class="purple-input" label="Name" :value='patient.Name' id='Name'/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Email" class="purple-input" :value='patient.email' id='email'/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Mobile" class="purple-input" :value='patient.mobile' id='mobile'/>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="updateProfile">Update Profile</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
let urlParams = new URLSearchParams(window.location.search);
let patient_id = urlParams.get('id') ? urlParams.get('id') : 1
const patientsQuery = gql`
  query patientsDetail {
    patient(id:${patient_id}){
      id
      Name
      mobile
      email
    }
  }
  `
export default {
  data () {
    return {
      postId: this.$route.query.id,
      patient : {}
    }
  },
  methods: {
    updateProfile () {
      const updatePatient = gql`
        mutation updatePatient($id: Int!, $Name: String, $email: String, $mobile: String) {
          updatePatient(id: $id, Name: $Name, email: $email, mobile: $mobile) {
            id
            Name
            email
            mobile
          }
        }
      `
      this.$apollo.mutate({
        mutation: updatePatient,
        variables: {
          id: this.postId,
          Name: document.getElementById('Name').value,
          email: document.getElementById('email').value,
          mobile: document.getElementById('mobile').value
        }
      });
      this.$router.push('/dashboard?id' + this.postId)
    }
  },
  apollo: {
    // Local state 'items' data
    patient: {
      query: patientsQuery
    }
  },
};
</script>
