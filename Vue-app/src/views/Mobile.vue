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
                <a
                :href="'mobileView?id=' + item.id"
                >
                {{ item.Name }}
                </a>
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.MRN }}</td>
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
        text: 'Email',
        value: 'email'
      },
      {
        sortable: false,
        text: 'MRN',
        value: 'MRN'
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
