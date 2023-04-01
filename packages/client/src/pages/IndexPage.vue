<!-- eslint-disable vue/block-lang -->
<template>
  <q-page>
  <div class="container-fluid">
    <h2 class="m-5">
  {{  tasks[0].title}}
    </h2>

  <!-- <div class="fit row inline wrap justify-around items-stretch"> -->
    <div
class="drop-zone " @drop="onDrop($event, 'Done')"
    @dragenter.prevent @dragover.prevent>
      <div
v-for="item in getList('Done')" :key="item.id" draggable="true" class="drag-el text-red"
        @dragstart="startDrag($event, item)">
        {{ item.title }}
      </div>
    </div>
    <div class="drop-zone " @drop="onDrop($event, 'In Progress')" @dragenter.prevent @dragover.prevent>
      <div
v-for="item in getList('In Progress')" :key="item.id" draggable="true" class="drag-el"
        @dragstart="startDrag($event, item)">
        {{ item.title }}
      </div>
    </div>
  </div>
</q-page>
</template>


<script lang="ts"  setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Task } from '../components/models'



const tasks = ref<Task[]>([])

 await api.get('tasks').then(res => {
  tasks.value = res.data;
  console.log(res.data);

});



function getList(list: string) {
  return tasks.value.filter(item => {
    console.log(item.status);

    return item.status == list})

}
function startDrag(event:
  DragEvent, item : Task) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id)
  }
}


function onDrop(event: DragEvent, list: string) {
  if (event.dataTransfer) {
    const itemID = event.dataTransfer?.getData('itemID');
    // const isThereItemID = JSON.parse(event.dataTransfer.getData("text") || "");
console.log('on drop', 'id', itemID);

    let item: Task = tasks.value.find((item) => item.id == itemID) as Task
    item.status = list

  }
}
</script>

<style lang="scss" scoped>
.drop_zone {
  overflow: auto; min-width: 300; max-width: 300;
}
</style>
