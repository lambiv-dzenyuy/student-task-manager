<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer :width="260" class="bg-primary text-white rounded-borders" show-if-above bordered>

      <q-list>
        <q-item>
          <div class="fit column wrap justify-center items-center content-center">
          <q-avatar class="q-my-lg">
            <img :src="currentUser?.avatar">
          </q-avatar>
          <q-item-label>
            {{` ${currentUser?.firstName}  ${currentUser?.lastName}`}}
          </q-item-label>
        </div>
        </q-item>

        <q-list
          padding
          class="text-white text-weight-medium text-size-14 line-height-20"
        >


          <q-separator class="q-mx-md q-mb-md" dark/>

          <q-item
            class="q-mx-md rounded-borders"
            clickable
            exact-active-class="text-accent"
            to="/view"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiViewDashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
          class="q-mx-md rounded-borders"
            clickable
            exact-active-class="text-accent"
            to="/view/projects"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiProjector" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Projects</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
          class="q-mx-md rounded-borders"
clickable
exact-active-class="text-accent"
to="tasks"
>
<q-item-section avatar>
  <q-btn flat dense :icon="mdiDomain" />
</q-item-section>
<q-item-section>
  <q-item-label>My Tasks</q-item-label>
</q-item-section>
</q-item>
<q-item

class="q-mx-md rounded-borders"

clickable
exact-active-class="text-white"
@click="openDialog=!openDialog"
>
<q-item-section avatar>
  <q-btn flat dense :icon="mdiPlus" />
</q-item-section>
<q-item-section>
  <q-item-label>Create New Task</q-item-label>
  <q-dialog v-model="openDialog">
  <createTask  @open-create-task-dialog="()=> openDialog=!openDialog" />
  </q-dialog>
</q-item-section>
</q-item>
          <q-separator class="q-mx-md" spaced="sm" dark/>

          <q-item>
            <q-item-section class="text-weight-bold text-white"> Settings </q-item-section>
          </q-item>
          <q-item  clickable>

             <q-item-section>
              <q-select

    v-model="locale"
    :options="localeOptions"
    label="Language"
    dense
    filled
    outlined
    rounded
    bg-color="white"
    square
    emit-value
    map-options

width="150px"
    options-dense
    class="fit q-px-md text-accent"

  />
            </q-item-section>
          </q-item>
        </q-list>



      </q-list>
    </q-drawer>

    <q-page-container >

      <router-view />

    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import {
  mdiDomain,

  mdiViewDashboard,

mdiPlus,
mdiProjector,
} from '@quasar/extras/mdi-v6';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import createTask from 'src/components/create-task.vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { appNotify } from 'src/components/notify';


const router= useRouter()
const openDialog = ref(false)

const { locale } = useI18n({ useScope: 'global' });
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
];
const auth = useAuthStore()
onBeforeMount(async  ()=>{
  if(!auth.isAuthenticated){
    router.push({name : 'login'})
    appNotify.error('Unauthorized User')
  }
})

const currentUser = auth.authUser
</script>

<style lang="scss" scoped>
.q-page-container{
  background-color: #E5E5E5 !important;
}
.q-select{
  width: 150px;
}
</style>
