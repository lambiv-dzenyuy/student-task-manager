<template>
  <q-card class="q-dialog-plugin rounded-borders ">
    <q-card-section class="text-center">
      Create Task
    </q-card-section>
    <q-card-section>
      <q-form class="q-px-sm ">
        <q-select
         v-model="projectTitle"
         square
         clearable
         lazy-rules
         bordered
         outlined
         class="text-red q-pa-md"
         :options="projectNames"
         label="project">

      </q-select>
      <q-input
        v-model="taskDetails.title"
        square
        outlined
        clearable
        type="text"
        class="text-red q-pa-md"
        label="Title">
      </q-input>
      <q-input
        v-model="taskDetails .description"
        square
        outlined
        clearable
        type="textarea"
        class="text-red q-pa-md"
        label="Description"  >
      </q-input>
      <q-select
         v-model="taskDetails .priority"
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
         v-model="taskDetails.status"
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
         v-model="taskDetails.startDate"
         square
         outlined
         clearable
         type="date"
         class="text-red q-pa-md"
         label="Start Date"
         >
      </q-input>
      <q-input
         v-model="taskDetails.endDate"
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
      <q-btn color="secondary" label="Save Task" @click="submitTask();$emit('open-create-task-dialog', true)" />
      <q-btn color="secondary" label="Cancel" @click="$emit('open-create-task-dialog', true)" />
    </q-card-actions>
  </q-card>
</template>

<script lang='ts' setup>
import { useAuthStore } from 'src/stores/auth';
import { computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { appNotify} from './notify'
import { Project } from './models';
import { useRouter } from 'vue-router';


interface Task {
  title: string,
  description: string,
  status: string,
  priority: string,
  endDate: Date,
  startDate: Date,
  projectId: string
}


const auth = useAuthStore()
const router = useRouter()


const projectTitle = ref('')
const taskDetails = ref<Task>({} as Task)

const projects = ref<Project[]>([])
const projectNames= computed(()=>{
  return projects.value.map(project => project.title)
})

defineEmits<{
(e: 'open-create-task-dialog', va: boolean): boolean
}>()

api.get(`projects/${auth.authUser?.id}`,  { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }}).then(res => {
  projects.value = res.data;
projects.value.map(item => console.log((new Date(item.createdAt)).toDateString()))

});

function submitTask(){
const projectId = projects.value.find(project => project.title == projectTitle.value)?.id
  api.post('tasks', {...taskDetails.value, projectId : projectId, studentId : auth.authUser?.id }, { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }}).then(response => {
          if(response.status >=200 && response.status <300){
  appNotify.success('Task created successfully')
        router.push(router.currentRoute.value)
          }
          else appNotify.error('Failed to create Task')

});
}
</script>
