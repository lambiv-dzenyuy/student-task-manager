<!-- eslint-disable vue/block-lang -->
<template>
  <div class="container-fluid">
    <h2 class="m-5">
      Vue Kanban Board
    </h2>
    <div @drop="onDrop($event, 'Done')" @dragenter.prevent @dragover.prevent class="drop-zone ">
      <div draggable="true" @dragstart="startDrag($event, item)" v-for="item in getList('Done')" :key="item.id"
        class="drag-el">
        {{ item.title }}
      </div>
    </div>
    <div @drop="onDrop($event, 'In Progress')" @dragenter.prevent @dragover.prevent class="drop-zone ">
      <div draggable="true" @dragstart="startDrag($event, item)" v-for="item in getList('In Progress')" :key="item.id"
        class="drag-el">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>


<script lang="ts"  setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Task } from '../components/models'



const tasks = ref<Task[]>([])

 await api.get('tasks').then(res => tasks.value = res.data ) as Task[]


function getList(list: string) {
  return tasks.value.filter(item => item.status == list)
}
function startDrag(event:
  DragEvent, item: Task) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', `${item.id}`)
  }
}


function onDrop(event: DragEvent, list: string) {
  if (event.dataTransfer) {
    const itemID = event.dataTransfer?.getData('itemID');
    // const isThereItemID = JSON.parse(event.dataTransfer.getData("text") || "");
console.log('on drop', 'id', itemID);

    let item: Task = tasks.value.find((item) => item.id.toString() == itemID) as Task
    item.status = list

  }
}
</script>

<style lang="scss" scoped>
.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #ecf0f1;
  padding: 10px;
  min-height: 10px
}

.drag-el {
  background-color: aqua;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
