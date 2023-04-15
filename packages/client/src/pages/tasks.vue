<template>
  <q-page>
    <div class="q-px-xl">
    <div class="text-h5 text-capitalize font-weight-medium q-pa-md">
      {{ $t('tasks') }}
    </div>
    <div class="flex justify-end q-mx-md">
      <q-btn class="bg-secondary text-white text-capitalize" label="Add Task" @click="openDialog=!openDialog" />

      <q-dialog v-model="openDialog">
      <create-task
      @open-dialog="()=> openDialog=!openDialog"
      @task="(taskDetails : Task)=>tasks.push(taskDetails)"
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


          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm">
              Title

            </q-item-label>
          </q-item-section>
          <q-item-section class="col" >
            <q-item-label class="q-mt-sm">
             Project
            </q-item-label>
          </q-item-section>
          <q-item-section class="col" >
            <q-item-label class="q-mt-sm">
              Start Date
            </q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-item-label class="q-mt-sm"> End Date </q-item-label>
          </q-item-section>
          <q-item-section class="">
            <q-item-label class="q-mt-sm"> Status </q-item-label>
          </q-item-section>
          <q-item-section class="">
            <q-item-label class="q-mt-sm"> Priority </q-item-label>
          </q-item-section>
          <q-item-section end class="">
            <q-item-label class="q-mt-sm"> Actions </q-item-label>
          </q-item-section>
        </q-item>

          <q-scroll-area
          class="scroll"
          visible
          :vertical-thumb-style="thumbStyle"
          >

        <q-item
          v-for=" task , index in tasks"
          :key="task.id"
          class="text-left q-ma-sm justify-between"

        >
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm">
              {{ task.title }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col" >
            <q-item-label class="q-mt-sm">
              {{projects.find(project => project.id === task.projectId)?.title}}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-item-label class="q-mt-sm">
              {{ task
              .startDate ? (new Date(task
              .startDate)).toDateString() : 'Not Specified'}}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col text-weight-bold">
            <q-item-label class="q-mt-sm">
              {{ task.endDate ? (new Date(task.endDate)).toDateString() : 'Not Stated'}}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-item-label class="q-mt-sm">
              {{ task.status}}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-item-label class="q-mt-sm">
              {{ task.priority}}
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
              ><q-tooltip >
          Edit Task
        </q-tooltip>
        </q-btn>
              <q-btn
              flat
              dense
                round
                :icon="mdiTrashCan"
                @click="deleteProject(index)"
              >
              <q-tooltip >
          delete project
        </q-tooltip>
            </q-btn>
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
import {  Task } from '../components/models'
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router'
import CreateTask from 'src/components/create-task.vue';
import { Dialog } from 'quasar';


const router = useRouter()

const taskDetails = ref<Task>({} as Task)
const projects = ref<Task []>([])
const openDialog=ref(false)
const search = ref('')
const tasks = ref<Task[]>([] as Task[])

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

  api.get(`projects/${auth.authUser?.id}`,  { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }}).then(res => {
  projects.value = res.data;
        })

});
})

function deleteProject(projectIndex: number){


  Dialog.create({
    title: 'Delete Project',
    message: `Are you sure you want to delete ${tasks.value[projectIndex].title} project\t This action will delete all related tasks`,
    cancel: {
      flat: true,
      color: 'accent',
    },
    ok: {
      flat: true,
      color: 'negative',
    },
  }).onOk(() => {
    const id  = tasks.value[projectIndex].id;
  tasks.value.splice(projectIndex, 1)
  api.delete(`projects/${id}`,  { headers: {
           Authorization:'Bearer ' + auth.token,
          'x-access-token': auth.token
        }})
  });


}



const thumbStyle : Partial<CSSStyleDeclaration> = {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#000235',
        width: '4px',
        opacity: '0.75px'
};
</script>

<style lang="scss" scoped>
.scroll {
  height: calc(
    100vh - #{$drawer-margin-top-bottom * 2} - #{$header-container-height} - 200px
  );
}
</style>
