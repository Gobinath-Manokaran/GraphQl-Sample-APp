import { pubsub } from './subscriptions';

// const authors = [
//   { id: 1, firstName: 'Tom', lastName: 'Coleman' },
//   { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
// ];

// const posts = [
//   { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
//   { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
//   { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
// ];

const patients = [
  {
    id: 1,
    Name: 'John Snow',
    DOB: '01-10-2014',
    Gender: 'Male',
    MRN: 1236,
    Profile: 'https://cdna.artstation.com/p/assets/images/images/002/898/132/large/hector-jenz-jonhsnow-square-detaill.jpg?1467032227',
    email: 'johsnow@nightswatch.com',
    city: 'Winterfell',
    mobile: '(234) 567-7890'
  },
  {
    id: 2,
    Name: 'Tyrion Lanuister',
    DOB: '01-10-2014',
    Gender: 'Male',
    MRN: 1243,
    Profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHoRibJvwSc-2YddMO6LFXLvQATlVNObyvaYaplsYGwdr7Vw3Lqg',
    email: 'tyrion.lanister@kingslanding.com',
    city: 'Kings Landing',
    mobile: '(234) 567-7890'
  },
  {
    id: 3,
    Name: 'Daenerys Targaryen',
    DOB: '01-10-2014',
    Gender: 'Female',
    MRN: 1248,
    Profile: 'http://v5.femalefirst.co.uk/image-library/square/500/g/game-of-thrones-season-6-now-daenerys-targaryen.jpg',
    email: 'mother.dragons@targaryen.com',
    city: 'Westeros',
    mobile: '(234) 567-7890'
  },
];

const medicationsList = [
  {
    id:1,
    Name:'Crocin 1',
    patient_id:1,
    dose:'2 x day',
    NDC:'8765JLKLKLIO77HHJ12'
  },
  {
    id: 2,
    Name: 'Asthalin',
    patient_id: 3,
    dose: '2 x day',
    NDC: '8765JLKLKLIO77HHJ12'
  },
];
const encounterList = [
  {
    id: 1,
    Date: '2010-01-02 09:45:00',
    facility: 'facility 1',
    patient_id: 1,
  },
  {
    id: 2,
    Date: '2010-01-03 09:45:00',
    facility: 'facility 2',
    patient_id: 1,
  },
  {
    id: 3,
    Date: '2010-01-02 09:45:00',
    facility: 'facility 1',
    patient_id: 2,
  },
];

const documentList = [
  {
    id: 1,
    Name: 'Crocin 1',
    Url:'http://www/google.com',
    patient_id: 1,
  },
];

const diseasesList = [
  {
    id: 1,
    Name: 'Asthma',
    Type: 'Chronic',
    patient_id: 1,
    ICD: 'A1.02.s3',
    Since: '10 Years'
  },
  {
    id: 2,
    Name: 'Diabetes',
    Type: 'Chronic',
    patient_id: 2,
    ICD: 'A1.02.s1',
    Since: '5 Years'
  },
  {
    id: 3,
    Name: 'Heart Block',
    Type: 'Chronic',
    patient_id: 2,
    ICD: 'A1.02.s4',
    Since: '4 Years'
  },
  {
    id: 3,
    Name: 'Anxiety',
    Type: 'Chronic',
    patient_id: 3,
    ICD: 'A1.02.P3',
    Since: 'Birth'
  },
  {
    id: 4,
    Name: 'Asthma',
    Type: 'Chronic',
    patient_id: 3,
    ICD: 'A1.02.s3',
    Since: '2 Years'
  },
]

const healthDatalist = [
  {
    weight: '190 lbs',
    height: '180 cms',
    patient_id:1,
    id:1,
    heartRate: [100,98,85,120,140,132,127],
    bloodGlucose: [100, 198, 285, 320, 140, 92, 127],
    bloodPressure: [200, 398, 485, 220, 140, 92, 227]
  },
  {
    weight: '120 lbs',
    height: '90 cms',
    patient_id: 2,
    id: 2,
    heartRate: [65,72,68,134,68,69,78],
    bloodGlucose: [100, 198, 285, 320, 140, 92, 127],
    bloodPressure: [200, 398, 485, 220, 140, 92, 227]
  },
  {
    weight: '170 lbs',
    height: '160 cms',
    patient_id: 3,
    id: 3,
    heartRate: [100, 98, 85, 120, 140, 132, 127],
    bloodGlucose: [100, 198, 285, 320, 140, 92, 127],
    bloodPressure: [200, 398, 485, 220, 140, 92, 227]
  },
]
const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
    patients() {
      return patients;
    },
    patient(_, { id }) {
      return patients.find(patient => patient.id === id);
    },
    documents(){
      return documentList
    },
    author(_, { id }) {
      return authors.find(author => author.id === id)
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = posts.find(post => post.id === postId)
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      pubsub.publish('postUpvoted', post);
      return post;
    },
  },
  Subscription: {
    postUpvoted(post) {
      return post;
    },
  },
  Author: {
    posts(author) {
      return posts.filter(post => post.authorId === author.id)
    },
  },
  Post: {
    author(post) {
      return authors.find(author => author.id === post.authorId)
    },
  },
  Patient: {
    medications(patient) {
      return medicationsList.filter(medication => patient.id === medication.patient_id)
    },
    encounters(patient) {
      return encounterList.filter(encounter => patient.id === encounter.patient_id)
    },
    documents(patient) {
      return documentList.filter(document => patient.id === document.patient_id)
    },
    diseases(patient) {
      return diseasesList.filter(disease => patient.id === disease.patient_id)
    },
    healthData(patient){
      return healthDatalist.find(healthData => patient.id === healthData.patient_id)
    }
  },
  Document: {
    patient(document){
      return patients.find(patient => patient.id === document.patient_id)
    }
  }
};

export default resolveFunctions;
