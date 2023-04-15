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

           v-model="projectDetails.endDate"
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
        <q-btn
          color="secondary"
          label="save" @click="submitTask();
          $emit('project', projectDetails);
          $emit('open-dialog', true)" />
        <q-btn color="secondary" label="Cancel" @click="$emit('open-dialog', true)" />
      </q-card-actions>
    </q-card>
</template>

<script lang='ts' setup>
import { useAuthStore } from 'src/stores/auth';
import { Project } from './models';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { appNotify } from './notify';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
defineEmits<{
  (e: 'open-dialog', va: boolean): boolean
  (e: 'project', value: Project): Project
}>()

const projectDetails = ref<Project>({} as Project)
  function submitTask(){
    projectDetails.value.createdAt = new Date()
  api.post('projects', {...projectDetails.value, studentId : auth.authUser?.id}, { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }}).then(response => {
          if(response.status >=200 && response.status <300){
              appNotify.success
          }
          else appNotify.error

});
 router.push(route)
}
</script>
