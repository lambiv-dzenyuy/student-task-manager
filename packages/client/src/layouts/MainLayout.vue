<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer :width="260" class="drawer rounded-borders" show-if-above bordered>
      <q-list>
        <q-item>
          <div
            class="fit column wrap justify-center items-center content-center"
          >
            <q-avatar class="q-my-lg">
              <img :src="currentUser?.avatar" />
            </q-avatar>
            <q-btn-dropdown
              split
              flat
              no-caps
              :label="`${auth.authUser?.firstName}  ${auth.authUser?.lastName}`"
              ><q-list dense bordered padding>
                <q-item v-close-popup clickable @click="openEdithDetails()">
                  <q-item-section avatar>
                    <q-avatar :icon="mdiPencil" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Edith Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable @click="logout()">
                  <q-item-section avatar>
                    <q-avatar :icon="mdiLogout" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-item>
        <q-separator class="q-mx-md" spaced="sm"  />
        <q-list  class="text-weight-medium text-size-14 line-height-20">
          <q-separator class="q-mx-md q-mb-md" dark />

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
            to="/view/tasks"
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
            @click="openDialog = !openDialog"
          >
            <q-item-section avatar>
              <q-btn flat dense :icon="mdiPlus" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create New Task</q-item-label>
              <q-dialog v-model="openDialog">
                <createTask
                  @open-create-task-dialog="() => (openDialog = !openDialog)"
                />
              </q-dialog>
            </q-item-section>
          </q-item>
          <q-separator class="q-mx-md" spaced="sm"  />

          <q-item>
            <q-item-section class="text-weight-bold"> Settings </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-select
                v-model="locale"
                :options="localeOptions"
                label="Language"
                dense
                outlined
                options-dense
                class="full-width q-mx-lg text-accent"
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
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import createTask from 'src/components/create-task.vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { appNotify } from 'src/components/notify';
import { Student } from 'src/components/models';
import { useQuasar } from 'quasar';
import EdithProfile from 'src/components/edith-profile.vue';

const router = useRouter();
const openDialog = ref(false);

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

function openEdithDetails() {
  $q.dialog({
    component: EdithProfile,

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
.drawer{

  border-radius: 10px;

}
</style>
