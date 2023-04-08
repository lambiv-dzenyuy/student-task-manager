<template>

    <q-card class="q-dialog-plugin rounded-borders">
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

           v-model="projectDetails .title"
           square
           clearable
           lazy-rules
           bordered
           outlined
           class="text-red q-pa-md"
           type="date"
           label="End Date">


  </q-input>


</q-form>
</q-card-section>

      <q-card-actions align="center">
        <q-btn color="secondary" label="save"  />
        <q-btn color="secondary" label="Cancel" @click="$emit('open-dialog', true)" />
      </q-card-actions>
    </q-card>
</template>

<script lang='ts' setup>
import { Project } from './models';
import { ref } from 'vue';


defineEmits<{
  (e: 'open-dialog', va: boolean): boolean
  (e: 'update', value: string): void
}>()

const projectDetails = ref<Project>({} as Project)

</script>
