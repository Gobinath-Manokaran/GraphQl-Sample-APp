<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Medications List"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="patient.medications"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.Name }}</td>
              <td>{{ item.dose }}</td>
            </template>
          </v-data-table>
        </material-card>
        <a :href= '"/mobileView?id=" + patient.id'>Back</a>
      </v-flex>
      <!-- <v-flex
        md12
      >
        <material-card
          color="green"
          flat
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex> -->
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
    medications{
        Name
        dose
    }
  }
}
`
export default {
  data: () => ({
    headers: [
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
    patient: {}
  }),
  // Apollo GraphQL
  apollo: {
    // Local state 'items' data
    patient: {
      query: patientsQuery
    }
  }
}
</script>
<style scoped>
img {
    width: 50px;
    border-style: none;
    border-radius: 50%;
}
</style>
