<template>
  <q-page>
    <div class="q-px-xl">
    <div class="text-h5 text-capitalize font-weight-medium q-pa-md">
      {{ $t('project') }}
    </div>
    <div class="flex justify-end q-mx-md">
      <q-btn class="bg-secondary text-white text-capitalize" label="Add Project" @click="openDialog=!openDialog" />

      <q-dialog v-model="openDialog">
      <CreateProject
      @open-dialog="()=> openDialog=!openDialog"
      @project="(projectDetails)=>tasks.push(projectDetails)"
      />
    </q-dialog>
    </div>
    <q-card class="fit q-px-md q-mt-md  product-card text-size-12 bg-white rounded-borders">
      <q-list padding class="fit">
        <q-item class="q-mx-sm text-black">
          <q-input
            v-model="search"
            dense
            outlined
            placeholder="Search Project"
            class="input-search text-size-14"
          >
            <template #prepend>
              <q-btn round flat dense :icon="mdiMagnify" />
            </template>
          </q-input>

        </q-item>
        <q-separator class="q-ma-md" />

        <q-item
          class="text-left bg-secondary text-white text-size-14 q-ma-sm justify-between rounded-borders"
        >


          <q-item-section class="col-4">
            <q-item-label class="q-mt-sm">
              Title

            </q-item-label>
          </q-item-section>
          <q-item-section class="col-3" >
            <q-item-label class="q-mt-sm">
              Date Created
            </q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm"> End Date </q-item-label>
          </q-item-section>

          <q-item-section end class="col-2">
            <q-item-label class="q-mt-sm"> Actions </q-item-label>
          </q-item-section>
        </q-item>

          <q-scroll-area
          class="scroll"
          visible
          :vertical-thumb-style="thumbStyle"
          >

        <q-item
          v-for=" project , index in tasks"
          :key="project.id"
          class="text-left q-ma-sm justify-between"
          clickable

        >
          <q-item-section class="col-4">
            <q-item-label class="q-mt-sm">
              {{ project.title }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm">
              {{ (new Date(project.createdAt)).toDateString()}}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col-3 text-weight-bold">
            <q-item-label class="q-mt-sm">
              {{ project.endDate ? (new Date(project.endDate)).toDateString() : 'Not Stated'}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <div class="row">
              <q-btn
                flat
                dense
                round
                :icon="mdiPencil"
                class="cursor-pointer"
              />
              <q-btn
              flat
              dense
                round
                :icon="mdiTrashCan"
                @click="deleteTask(index)"
              />
            </div>
          </q-item-section>
        </q-item>
        </q-scroll-area>
      </q-list>

    </q-card>
  </div>
  </q-page>
</template>

<script lang="ts" setup>
import { mdiMagnify, mdiPencil,  mdiTrashCan } from '@quasar/extras/mdi-v6';
import { api } from 'src/boot/axios';
import { Project, Task } from '../components/models'
import {  ref, onBeforeMount } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router'
import CreateProject from 'src/components/create-project.vue';
import { QTable } from 'quasar';
import { title } from 'process';


const router = useRouter()


const openDialog=ref(false)
const search = ref('')
const tasks = ref<Project[]>([] as Project[])

const auth = useAuthStore()
onBeforeMount(async  ()=>{
  if(!auth.isAuthenticated){
    router.push({name : 'login'})
  }
  api.get(`tasks/${auth.authUser?.id}`,  { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }}).then(res => {
  tasks.value = res.data;


});
})

function deleteTask(projectIndex: number){
  const id  = tasks.value[projectIndex].id;
  tasks.value.splice(projectIndex, 1)
  api.delete(`tasks/${id}`,  { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }})
}
// function viewProjectTasks(project: Project){
//  router.push({name: 'project-tasks', params : { projectId : project.id, projectTitle : project.title}})
// }
const thumbStyle = {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#000235',
        width: '4px',
        opacity: 0.75
};
</script>

<style lang="scss" scoped>
.scroll {
  height: 60vh;
  max-width: 100% ;
}
</style>