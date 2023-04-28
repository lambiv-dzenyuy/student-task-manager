<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin rounded-borders">
      <q-card-section class="text-center"> Create New Project </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm">
          <q-input
            v-model="projectDetails.title"
            square
            outlined
            clearable
            type="text"
            class="text-red q-pa-md"
            :label="$t('title')"
          >
          </q-input>
          <q-input
            v-model="projectDetails.description"
            square
            outlined
            clearable
            type="textarea"
            class="text-red q-pa-md"
            :label="$t('description')"
          >
          </q-input>
          <q-input
            v-model="projectDetails.endDate"
            square
            outlined
            clearable
            type="date"
            class="text-red q-pa-md"
            :label="$t('endDate')"
          >
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="secondary"
          :label="$t('save')"
          @click="
            submitTask();
            $emit('project', projectDetails);
          "
        />
        <q-btn
          color="secondary"
          :label="$t('cancel')"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { Project } from './models';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { appNotify } from './notify';
import { useDialogPluginComponent } from 'quasar';

const auth = useAuthStore();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

defineEmits<{
  (e: 'project', value: Project): Project;
}>();

const props = defineProps({
  id: String
});

api
  .get(`projects/${props.id}`, {
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'x-access-token': auth.token
    }
  })
  .then((res) => {
    projectDetails.value = res.data;
  });

const projectDetails = ref<Project>({} as Project);
function submitTask() {
  projectDetails.value.createdAt = new Date();
  api
    .patch(
      `projects/${props.id}`,
      { ...projectDetails.value },
      {
        headers: {
          Authorization: 'Bearer ' + auth.token,
          'x-access-token': auth.token
        }
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        appNotify.success('Project Updated Successfully');
        onDialogOK();
      } else appNotify.error('Failed to Update Project');
    });
}
</script>
