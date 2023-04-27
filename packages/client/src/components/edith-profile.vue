<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin rounded-borders">
      <q-card-section class="text-center"> Edith Profile </q-card-section>
      <q-card-section>
        <q-form v-if="userDetails" class="q-px-sm">
          <q-input
            v-model="userDetails.firstName"
            square
            outlined
            clearable
            type="text"
            class="text-red q-pa-md"
            label="First Name"
          >
          </q-input>
          <q-input
            v-model="userDetails.lastName"
            square
            outlined
            clearable
            type="text"
            class="text-red q-pa-md"
            label="Last Name"
          >
          </q-input>
          <q-input
            v-model="userDetails.email"
            square
            outlined
            clearable
            class="text-red q-pa-md"
            label="End Date"
          >
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="secondary" label="save" @click="submitUpdate()" />
        <q-btn color="secondary" label="Cancel" @click="onDialogCancel()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { useDialogPluginComponent } from 'quasar';
import { api } from 'src/boot/axios';
import { appNotify } from './notify';
import { useRoute, useRouter } from 'vue-router';
import { Student } from './models';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const userDetails = auth.authUser;

function submitUpdate() {
  api
    .patch(
      `users/${userDetails?.id}`,
      { userDetails },
      {
        headers: {
          Authorization: 'Bearer ' + auth.token,
          'x-access-token': auth.token
        }
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        appNotify.success();
        auth.set(auth.token, userDetails as Student);
        onDialogOK();
      } else appNotify.error();
    });
  router.push(route);
}
</script>
