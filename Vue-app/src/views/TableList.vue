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
          title="Patient List"
          text=""
        >
          <v-data-table
            :headers="headers"
            :items="patients"
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
              <td>
                <img :src='item.Profile'/>
              </td>
              <td>
                <a
                :href="'dashboard?id=' + item.id"
                >
                {{ item.Name }}
                </a>
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.MRN }}</td>
              <td>{{ item.DOB }}</td>
              <td>
                <template v-for="medication in item.medications">
                  <span :key='medication.Name'>{{ medication.Name }}</span>
                </template>
              </td>
              <td>
                <template v-for="disease in item.diseases">
                  <span :key='disease.Name'>{{ disease.Name }}</span>
                </template>
              </td>
            </template>
          </v-data-table>
        </material-card>
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
const patientsQuery = gql`
  query allPatients{
    patients {
      id
      Name
      email
      MRN
      DOB
      city
      Profile
      medications {
        Name
      }
      diseases{
        Name
      }
    }
  }
`
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Image',
        value: 'Profile'
      },
      {
        sortable: false,
        text: 'Name',
        value: 'Name'
      },
            {
        sortable: false,
        text: 'Email',
        value: 'email'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
      {
        sortable: false,
        text: 'MRN',
        value: 'MRN'
      },
      {
        sortable: false,
        text: 'DOB',
        value: 'DOB',
      },
      {
        sortable: false,
        text: 'Medications',
        value: 'medication_string',
      },
      {
        sortable: false,
        text: 'Diseases',
        value: 'diseases_string'
      }
    ],
    patients: []
  }),
  // Apollo GraphQL
  apollo: {
    // Local state 'items' data
    patients: {
      query: patientsQuery
    }
  },
  watch:{
    // patients() {
    //   this.patients.forEach(patient => {
    //     let medications = patient.medications.map((a)=> a.Name)
    //     patient['medication_string'] = medications.join(',')
    //     let diseases = patient.diseases.map((a)=> a.Name)
    //     patient['diseases_string'] = diseases.join(',')
    //     Object.assign({}, item, {selected:false})
    //   })
    // }
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
