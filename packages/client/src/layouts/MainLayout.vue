<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      :width="260"
      class="drawer rounded-borders"
      show-if-above
      bordered
    >
      <q-list>
        <q-item>
          <div
            class="fit column wrap justify-center items-center content-center"
          >
            <q-avatar v-if="auth.authUser" size="80px" class="q-my-lg" color="blue-1">
             {{ auth.authUser?.firstName.charAt(0) + auth.authUser?.lastName.charAt(0) }}
            </q-avatar>
            <q-btn-dropdown
              split
              flat
              no-caps
              :label="`${auth.authUser?.firstName}  ${auth.authUser?.lastName}`"
              ><q-list dense bordered padding>
                <q-item v-close-popup clickable @click="openDialog(EdithProfile)">
                  <q-item-section avatar>
                    <q-avatar :icon="mdiPencil" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t('edithProfile') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable @click="logout()">
                  <q-item-section avatar>
                    <q-avatar :icon="mdiLogout" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t('logout') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-item>
        <q-separator class="q-mx-md" spaced="sm" />
        <q-list class="text-weight-medium text-size-14 line-height-20">
          <q-item
            class="q-mx-md rounded-borders"
            clickable
            exact-active-class="text-accent"
            to="/view/dashboard"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiViewDashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('dashboard') }}</q-item-label>
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
              <q-item-label>{{ $t('projects') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="q-mx-md rounded-borders"
            clickable
            exact-active-class="text-accent"
            to="/view/tasks"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiDomain" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('myTasks') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="q-mx-md rounded-borders"
            clickable
            exact-active-class="text-white"
            @click="openDialog(createTask)"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiPlus" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('createNewTask') }}</q-item-label>



            </q-item-section>
          </q-item>
          <q-separator class="q-mx-md" spaced="sm" />

          <q-item>
            <q-item-section class="text-weight-bold">
              {{ $t('settings') }}
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-select
                v-model="locale"
                :options="localeOptions"
                :label="$t('language')"
                dense
                outlined
                emit-value
                map-options
                options-dense
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
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
  mdiLogout,
  mdiPencil
} from '@quasar/extras/mdi-v6';
import { Component, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import createTask from 'src/components/create-task.vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { appNotify } from 'src/components/notify';
import { Student } from 'src/components/models';
import { useQuasar } from 'quasar';
import EdithProfile from 'src/components/edith-profile.vue';

const router = useRouter();


const { locale } = useI18n({ useScope: 'global' });

const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' }
];

const auth = useAuthStore();
const $q = useQuasar();

onBeforeMount(async () => {
  if (!auth.isAuthenticated) {
    router.push({ name: 'login' });
    appNotify.error('Unauthorized User');
  }
});

function logout() {
  auth.set('', {} as Student);
  router.push({ name: 'login' });
}

function openDialog(component: Component) {
  $q.dialog({
    component: component,

    // props forwarded to your custom component
    componentProps: {
      text: 'something'
      // ...more..props...
    }
  })
    .onOk(() => {
      console.log('OK');
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
}

const currentUser = auth.authUser;
</script>

<style lang="scss" scoped>
.q-page-container {
  background-color: #e5e5e5 !important;
}
.drawer {
  border-radius: 10px;
}
</style>
