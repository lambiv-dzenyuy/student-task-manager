<template>
  <div class="q-py-lg column">
    <div class="q-mx-lg text-h5">{{ $route.params.projectTitle }}</div>
    <div
      class="q-pa-sm fit row no-wrap justify-between items-stretch content-stretch"
    >
      <q-card
        v-for="(status, index) in taskStatus"
        :key="index"
        flat
        bordered
        class="rounded-borders bg-white drop-zone"
        @drop="onDrop($event, status)"
        @dragenter.prevent
        @dragover.prevent
      >
        <q-card-section>
          <div class="text-h6">
            {{ status === 'Done' ? 'Completed' : status }}
          </div>
        </q-card-section>
        <q-scroll-area
          visible
          :vertical-thumb-style="thumbStyle"
          class="scroll"
        >
          <q-card
            v-for="item in getList(status)"
            :key="item.id"
            bordered
            flat
            draggable="true"
            class="task-card q-ma-sm"
            @dragstart="startDrag($event, item)"
          >
            <q-card-section class="column">
              <q-badge
                :color="`${
                  item.priority === $t('high')
                    ? 'negative'
                    : item.priority === $t('Medium')
                    ? 'accent'
                    : 'positive'
                } q-px-md text-weight-medium`"
                floating
                transparent
                :class="`text-capitalize text-${
                  item.priority === $t('high') ? 'white' : 'black'
                } q-px-md text-weight-medium`"
              >
                {{ item.priority }}
              </q-badge>

              <span class="text-weight-medium text-italics">
                {{ item.title }}
              </span>
              <span
                ><span> Created: </span>
                {{
                  Math.ceil(
                    (new Date().getTime() -
                      new Date(item.createdAt).getTime()) /
                      (1000 * 3600 * 24)
                  )
                }}
                <span>days ago </span></span
              >
            </q-card-section>
          </q-card>
        </q-scroll-area>
        <q-card-actions class="q-pa-none q-ma-none text-secondary">
          <q-btn flat dense class="text-capitalize" :icon="mdiPlus">
            {{ $t('newItem') }}
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card
        flat
        bordered
        class="rounded-borders bg-white drop-zone"
        @drop="onDrop($event, 'Archived')"
        @dragenter.prevent
        @dragover.prevent
      >
        <q-card-section>
          <div class="text-h6">Archived</div>
        </q-card-section>
        <q-scroll-area
          visible
          :vertical-thumb-style="thumbStyle"
          class="scroll"
        >
          <q-card
            v-for="item in getList('Archived')"
            :key="item.id"
            bordered
            flat
            draggable="true"
            class="task-card q-ma-sm"
            @dragstart="startDrag($event, item)"
          >
            <q-card-section class="column">
              <q-badge
                :color="`${
                  item.priority === $t('high')
                    ? 'negative'
                    : item.priority === $t('Medium')
                    ? 'accent'
                    : 'positive'
                } q-px-md text-weight-medium`"
                floating
                transparent
                :class="`text-capitalize text-${
                  item.priority === $t('high') ? 'white' : 'black'
                } q-px-md text-weight-medium`"
              >
                {{ item.priority }}
              </q-badge>
              <span class="text-weight-medium">{{ item.description }}</span>
              <span
                ><span>{{ $t('created') }}: </span
                >{{
                  Math.ceil(
                    (new Date().getTime() -
                      new Date(item.createdAt).getTime()) /
                      (1000 * 3600 * 24)
                  )
                }}
                <span>days ago </span></span
              >
            </q-card-section>
          </q-card>
        </q-scroll-area>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mdiPlus } from '@quasar/extras/mdi-v6';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Task } from '../components/models';
import { useAuthStore } from 'src/stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute();

const auth = useAuthStore();

const taskStatus = ref(['To-Do', 'In Progress', 'Done']);
const tasks = ref<Task[]>([]);

api
  .get(`tasks/${auth.authUser?.id}/${route.params.projectId}`, {
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'x-access-token': auth.token
    }
  })
  .then((res) => {
    tasks.value = res.data;
  });

function getList(list: string) {
  return tasks.value.filter((item) => {
    console.log(item.status);

    return item.status == list;
  });
}

function startDrag(event: DragEvent, item: Task) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id);
  }
}

function onDrop(event: DragEvent, list: string) {
  if (event.dataTransfer) {
    const itemID = event.dataTransfer?.getData('itemID');
    let item: Task = tasks.value.find((item) => item.id == itemID) as Task;
    item.status = list;
    api.patch('tasks', item, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
        'x-access-token': auth.token
      }
    });
  }
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
.drop-zone {
  width: 350px;
}

.scroll {
  height: calc(
    100vh - #{$drawer-margin-top-bottom * 3} - #{$header-container-height * 2} -
      23px
  );
}
</style>
