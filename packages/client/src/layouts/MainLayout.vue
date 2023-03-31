<template>
  <q-layout view="lHh Lpr lFf">

    <q-drawer class="bg-primary text-white rounded-borders q-ma-sm" show-if-above bordered>

      <q-list>
        <q-item>
          <div class="fit column wrap justify-center items-center content-center">
          <q-avatar class="q-my-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-item-label>
            Rameline Ijang
          </q-item-label>
        </div>
        </q-item>

        <q-list
          padding
          class="text-grey-8 text-weight-medium text-size-14 line-height-20"
        >


          <q-separator class="q-mx-md q-mb-md" />

          <q-item
            v-for="item in sidebarListItems"
            :key="item.label"
            clickable
            active-class="text-accent"
            :to="item.to"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mx-md" spaced="lg" />

          <q-item>
            <q-item-section class="text-weight-bold"> Settings </q-item-section>
          </q-item>
          <q-item  clickable>
            <q-item-section avatar>
              <q-btn flat dense  />
            </q-item-section>
            <q-item-section>
              <q-item-label></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>



      </q-list>
    </q-drawer>

    <q-page-container>
      <Suspense>
      <router-view />
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {
  mdiDomain,

  mdiViewDashboard,
  mdiFileTreeOutline,

mdiPlus,
} from '@quasar/extras/mdi-v6';
// import { useI18n } from 'vue-i18n';
import { RouteLocationRaw } from 'vue-router';




// TODO: use correct icons from Flat icons instead of MDI
type SideBarItem = { label: string; icon: string; to?: RouteLocationRaw };
const sidebarListItems: SideBarItem[] = [
  { label: 'Dashboard', icon: mdiViewDashboard, to: '/' },
  { label: 'Projects/Categories', icon: mdiFileTreeOutline },
  { label: 'My Tasks', icon: mdiDomain },
  { label: 'Create New Task', icon: mdiPlus },

];



// const { locale } = useI18n({ useScope: 'global' });
// const localeOptions = [
//   { value: 'en', label: 'English' },
//   { value: 'fr', label: 'French' },
// ];


</script>
