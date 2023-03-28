
<template>
  <q-page class="row items-center justify-evenly">
    <ExampleComponent title="Example component" active :todos="todos" :meta="meta"></ExampleComponent>
    <!-- <li v-for="student in students" :key="student.id">{{ student.lastName }}</li> -->
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);

const students = fetch('http://localhost:3000/api/users', {
  method: 'get',
  headers: {
    'content-type': 'application/json'
  }
}).then(json => console.log(json));
;
const meta = ref<Meta>({
  totalCount: 1200
});
</script>
