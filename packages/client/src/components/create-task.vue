<template>

  <q-card class="q-dialog-plugin rounded-borders ">
    <q-card-section class="text-center">
      Create Task
    </q-card-section>
    <q-card-section>


<q-form class="q-px-sm ">
<q-input

  v-model="projectDetails.title"
  square
  outlined
  clearable
type="text"
class="text-red q-pa-md"
label="Title"

>
</q-input>
<q-input

v-model="projectDetails .description"
square
outlined
clearable
type="textarea"
class="text-red q-pa-md"
label="Description"

>

</q-input>
<q-select

         v-model="projectDetails .title"
         square
         clearable
         lazy-rules
         bordered
         outlined
         :options="['High','Medium', 'Low']"
         class="text-red q-pa-md"
         label="Priority">



</q-select>
<q-select

         v-model="projectDetails .studentId"
         square
         clearable
         lazy-rules
         bordered
         outlined
         class="text-red q-pa-md"
         :options="['To-Do','In Progress', 'Done']"
         label="status">


</q-select>
<q-input

         v-model="projectDetails.title"
         square
         outlined
         clearable
         type="date"
         class="text-red q-pa-md"
         label="Start Date"

         >

</q-input>
<q-input

         v-model="projectDetails.title"
         square
         outlined
         clearable
         type="date"
         class="text-red q-pa-md"
         label="End Date"

         >

</q-input>



</q-form>
</q-card-section>

    <q-card-actions align="center">
      <q-btn color="secondary" label="Save Task"  />
      <q-btn color="secondary" label="Cancel" @click="$emit('open-create-task-dialog', true)" />
    </q-card-actions>
  </q-card>
</template>

<script lang='ts' setup>
import { Project } from './models';
import { ref } from 'vue';


defineEmits<{
(e: 'open-create-task-dialog', va: boolean): boolean
(e: 'update', value: string): void
}>()

const projectDetails = ref<Project>({} as Project)

</script>
