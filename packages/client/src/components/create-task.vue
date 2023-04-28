<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin rounded-borders">
      <q-card-section class="text-center"> Create Task </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pa-md">
          <q-select
            v-model="projectTitle"
            clearable
            dense
            outlined
            :options="projectNames"
            label="project"
            :rules="[(value) => !!value || $t('firstNameIsRequired')]"
          >
          </q-select>
          <q-input
            v-model="taskDetails.title"
            square
            dense
            outlined
            clearable
            label="Title"
            :rules="[(value) => !!value || $t('firstNameIsRequired')]"
          >
          </q-input>
          <q-input
            v-model="taskDetails.description"
            square
            dense
            outlined
            clearable
            type="textarea"
            label="Description"
            class="q-py-md"
          >
          </q-input>
          <q-select
            v-model="taskDetails.priority"
            square
            dense
            clearable
            lazy-rules
            bordered
            outlined
            :options="[$t('high'), $t('medium'), $t('low')]"
            label="Priority"
            :rules="[(value) => !!value || $t('firstNameIsRequired')]"
          >
          </q-select>
          <q-select
            v-model="taskDetails.status"
            square
            clearable
            dense
            lazy-rules
            bordered
            outlined
            :options="['To-Do', 'In Progress', 'Done']"
            label="status"
          >
          </q-select>
          <q-input
            v-model="taskDetails.startDate"
            square
            outlined
            dense
            clearable
            class="q-py-md"
            type="date"
            label="Start Date"
          >
          </q-input>
          <q-input
            v-model="taskDetails.endDate"
            square
            dense
            outlined
            clearable
            type="date"
            class="q-py-md"
            label="End Date"
          >
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="secondary" label="Save Task" @click="submitTask()" />
        <q-btn color="secondary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { appNotify } from './notify';
import { Project } from './models';
import { useRouter } from 'vue-router';

interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
  endDate: Date;
  startDate: Date;
  projectId: string;
}
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const auth = useAuthStore();
const router = useRouter();

const projectTitle = ref('');
const taskDetails = ref<Task>({} as Task);

const projects = ref<Project[]>([]);
const projectNames = computed(() => {
  return projects.value.map((project) => project.title);
});

defineEmits<{
  (e: 'open-create-task-dialog', va: boolean): boolean;
}>();

api
  .get(`projects/${auth.authUser?.id}`, {
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'x-access-token': auth.token
    }
  })
  .then((res) => {
    projects.value = res.data;
    projects.value.map((item) =>
      console.log(new Date(item.createdAt).toDateString())
    );
  });

function submitTask() {
  const projectId = projects.value.find(
    (project) => project.title == projectTitle.value
  )?.id;
  api
    .post(
      'tasks',
      {
        ...taskDetails.value,
        projectId: projectId,
        studentId: auth.authUser?.id
      },
      {
        headers: {
          Authorization: 'Bearer ' + auth.token,
          'x-access-token': auth.token
        }
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        appNotify.success('Task created successfully');
        router.push(router.currentRoute.value);
        onDialogOK();
      } else appNotify.error('Failed to create Task');
    });
}
</script>
