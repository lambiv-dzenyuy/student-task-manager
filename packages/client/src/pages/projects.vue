<template>
  <div class="q-px-xl">
    <div class="text-h5 text-capitalize font-weight-medium q-pa-md">
      {{ $t('projects') }}
    </div>
    <div class="flex justify-end q-mx-md">
      <q-btn
        class="text-primary text-capitalize"
        :label="$t('addProject')"
        outline
        @click="openDialog(CreateProject)"
      />
    </div>
    <q-card
      class="fit q-px-md q-mt-md product-card text-size-12 bg-white rounded-borders"
    >
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
          class="header text-left text-primary text-bold text-size-14 q-ma-sm justify-between rounded-borders"
        >
          <q-item-section class="col-4">
            <q-item-label class="q-mt-sm"> {{ $t('title') }} </q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm">
              {{ $t('dateCreated') }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="col-3">
            <q-item-label class="q-mt-sm"> {{ $t('endDate') }} </q-item-label>
          </q-item-section>

          <q-item-section end class="col-2">
            <q-item-label class="q-mt-sm">{{ $t('actions') }} </q-item-label>
          </q-item-section>
        </q-item>

        <q-scroll-area
          class="scroll"
          visible
          :vertical-thumb-style="thumbStyle"
        >
          <q-item
            v-for="(project, index) in projects"
            :key="project.id"
            class="text-left q-ma-sm justify-between"
          >
            <q-item-section class="col-4">
              <q-item-label class="q-mt-sm">
                {{ project.title }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label class="q-mt-sm">
                {{ new Date(project.createdAt).toDateString() }}
              </q-item-label>
            </q-item-section>
            <q-item-section class="col-3 text-weight-bold">
              <q-item-label class="q-mt-sm">
                {{
                  project.endDate
                    ? new Date(project.endDate).toDateString()
                    : $t('notSpecified')
                }}
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
                  @click="openDialog(EditProject, project.id)"
                  ><q-tooltip> {{ $t('editProject') }} </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  dense
                  round
                  :icon="mdiTrashCan"
                  @click="deleteProject(index)"
                >
                  <q-tooltip> {{ $t('deleteProject') }} </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  dense
                  round
                  :icon="mdiBookArrowRightOutline"
                  @click="viewProjectTasks(project)"
                >
                  <q-tooltip> {{ $t('viewTasks') }} </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-list>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiBookArrowRightOutline,
  mdiMagnify,
  mdiPencil,
  mdiTrashCan
} from '@quasar/extras/mdi-v6';
import { api } from 'src/boot/axios';
import { Project } from '../components/models';
import { ref, onBeforeMount, Component } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import CreateProject from 'src/components/create-project.vue';
import { Dialog, useQuasar } from 'quasar';
import EditProject from 'src/components/edit-project.vue';

const router = useRouter();

const $q = useQuasar();

const search = ref('');
const projects = ref<Project[]>([] as Project[]);

function openDialog(component: Component, id?: string) {
  $q.dialog({
    component: component,

    componentProps: {
      id: id
    }
  })
    .onOk(() => {
      api
        .get(`projects/${auth.authUser?.id}/all`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
            'x-access-token': auth.token
          }
        })
        .then((res) => {
          projects.value = res.data;
        });
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('Called on OK or Cancel');
    });
}

const auth = useAuthStore();
onBeforeMount(async () => {
  if (!auth.isAuthenticated) {
    router.push({ name: 'login' });
  }
  api
    .get(`projects/${auth.authUser?.id}/all`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'x-access-token': auth.token
      }
    })
    .then((res) => {
      projects.value = res.data;
    });
});

function deleteProject(projectIndex: number) {
  Dialog.create({
    title: 'Delete Project',
    message: `Are you sure you want to delete ${projects.value[projectIndex].title} project\t This action will delete all related tasks`,
    cancel: {
      flat: true,
      color: 'accent'
    },
    ok: {
      flat: true,
      color: 'negative'
    }
  }).onOk(() => {
    const id = projects.value[projectIndex].id;
    projects.value.splice(projectIndex, 1);
    api.delete(`projects/${id}`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'x-access-token': auth.token
      }
    });
  });
}

function viewProjectTasks(project: Project) {
  router.push({
    name: 'project-tasks',
    params: { projectId: project.id, projectTitle: project.title }
  });
}

const thumbStyle: Partial<CSSStyleDeclaration> = {
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
    100vh - #{$drawer-margin-top-bottom * 2} - #{$header-container-height} -
      200px
  );
}
.header {
  border: 1px solid $primary;
}
</style>
