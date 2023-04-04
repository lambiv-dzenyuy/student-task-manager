<template>
  <q-page>
    <div class="text-h5 text-capitalize font-weight-medium q-pa-md">
      {{ $t('project') }}
    </div>
    <div class="flex justify-end q-mx-md">
      <q-btn class="bg-secondary text-white text-capitalize" label="Add Project" />
    </div>
    <q-card class="q-mx-md q-mt-md  product-card text-size-12 bg-white rounded-borders">
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
        <!--
          <q-scroll-area
          visible
          :vertical-thumb-style="thumbStyle"
          >
        -->
        <q-item
          v-for="project in projects"
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
              />
            </div>
          </q-item-section>
        </q-item>
        <!-- </q-scroll-area> -->
      </q-list>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { mdiMagnify, mdiPencil,  mdiTrashCan } from '@quasar/extras/mdi-v6';
import { api } from 'src/boot/axios';
import { Project } from '../components/models'
import {  ref, onBeforeMount } from 'vue';


const search = ref('')
const projects = ref<Project[]>([])


onBeforeMount(async  ()=>{
  api.get('projects').then(res => {
  projects.value = res.data;
projects.value.map(item => console.log((new Date(item.createdAt)).toDateString()))

});
})

const thumbStyle = {
        right: '4px',
        borderRadius: '7px',
        backgroundColor: '#000235',
        width: '4px',
        opacity: 0.75
      };


</script>

<style lang="scss" scoped>
.q-list{
  // height: 90vh;
  width: inherit;
}
</style>
