import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
  documents:[Document]
  patients:[Patient]
  medications:[Medication]
  author(id: Int!): Author
  patient(id: Int!): Patient
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
  updatePatient (id: Int!, Name: String, email: String, mobile: String): Patient
}

type Subscription {
  postUpvoted: Post
}

type Patient {
  id: Int!
  Name: String
  DOB: String
  Gender: String
  MRN: String
  Profile: String
  email: String
  city: String
  mobile: String
  medications: [Medication]
  encounters: [Encounter]
  documents: [Document]
  diseases:[Disease]
  healthData: HealthData
}
type Medication {
  id: Int!
  Name: String
  dose: String
  NDC: String
}
type Encounter{
  id: Int!,
  Date: String,
  facility: String,
}
type Document{
  id: Int!,
  Name: String,
  Url: String,
  patient: Patient
}
type Disease{
  id: Int!,
  Name: String,
  Type: String,
  ICD: String,
  Since: String
}
type HealthData{
  id: Int!,
  weight: String,
  height: String,
  heartRate:  [String!]
  bloodPressure: [String!]
  bloodGlucose: [String!]
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
