<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">

 <q-card class="q-dialog-plugin rounded-borders">
   <q-card-section class="text-center"> {{ $t('updateTask') }} </q-card-section>
   <q-card-section>
     <q-form class="q-px-sm q-px-md">
       <q-input
         v-model="taskDetails.title"
         square
         dense
         outlined
         clearable
         :label="$t('title')"
         :rules="[(value) => !!value || $t('titleIsRequired')]"
       >
       </q-input>
       <q-input
         v-model="taskDetails.description"
         square
         dense
         outlined
         clearable
         type="textarea"
         :label="$t('description')"

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
         class="q-py-md"
         :options="['High', 'Medium', 'Low']"
         :label="$t('priority')"

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
         :label="$t('status')"

       >
       </q-select>
       <q-input
         v-model="taskDetails.startDate"
         square
         outlined
         dense
         clearable
         class="q-pt-md"
         type="date"
         :label="$t('startDate')"
       >
       </q-input>
       <q-input
         v-model="taskDetails.endDate"
         square
         dense
         outlined
         clearable
         type="date"
         class="q-pt-md"
         :label="$t('endDate')"
       >
       </q-input>
     </q-form>
   </q-card-section>
   <q-card-actions align="center">
     <q-btn
       color="secondary"
       :label="$t('update')"
       @click="
         submitTask();

       "
     />
     <q-btn
       color="secondary"
       label="Cancel"
       @click="onDialogCancel"
     />
   </q-card-actions>
 </q-card>
 </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { appNotify } from './notify';

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
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const auth = useAuthStore();
const router = useRouter();


const taskDetails = ref<Task>({} as Task);




const props = defineProps({

  id : String

});

api
 .get(`tasks/${props.id}`, {
   headers: {
     Authorization: 'Bearer ' + auth.token,
     'x-access-token': auth.token
   }
 })
 .then((res) => {
   taskDetails.value = res.data;
 });

function submitTask() {

 api
   .patch(
     'tasks',
     {
      id : props.id,
       ...taskDetails.value,
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
       appNotify.success('Task updated successfully');
       router.push(router.currentRoute.value);
       onDialogOK();
     } else appNotify.error('Failed to update Task');
   });
}
</script>
