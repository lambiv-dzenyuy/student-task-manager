<template >
  <q-page>
<div class="q-py-lg col">
 <div class="q-mx-lg text-h5">Assignments</div>

  <div  class="q-pa-md   fit row no-wrap justify-between items-stretch content-stretch">


    <q-card

flat bordered
class="rounded-borders bg-white   drop-zone"
    @drop="onDrop($event, 'To-Do')"
    @dragenter.prevent @dragover.prevent >
    <q-card-section>
        <div class="text-h6">To-Do</div>
    </q-card-section>
    <q-scroll-area class="fit">
    <q-card
      v-for="item in getList('To-Do')"
      :key="item.id"
        bordered
        flat
        draggable="true"
        class="task-card q-ma-sm "
        @dragstart="startDrag($event, item)" >



        <q-card-section>

            <q-btn
            flat
            dense
            rounded
            disable
            size="sm"
            :color="item.priority==='high' ? 'white' : 'black' "
            :class="`text-capitalize bg-${ item.priority==='high' ? 'negative' : item.priority==='medium' ? 'accent' : 'positive'} q-px-md text-weight-medium`">
            {{ item.priority }}
          </q-btn>


            <span class="text-weight-medium">{{ item.description }}</span>



            <span>Due day: </span>{{ item.createdAt }}


        </q-card-section>


      </q-card>

    </q-scroll-area>


    </q-card>



  <div class="drop-zone " @drop="onDrop($event, 'In Progress')" @dragenter.prevent @dragover.prevent>
    <div
v-for="item in getList('In Progress')" :key="item.id" draggable="true" class="drag-el bg-accent q-ma-xl"
      @dragstart="startDrag($event, item)">
      {{ item.title }}
    </div>
  </div>
  <div class="drop-zone " @drop="onDrop($event, 'Done')" @dragenter.prevent @dragover.prevent>
    <div
v-for="item in getList('Done')" :key="item.id" draggable="true" class="drag-el bg-accent q-ma-xl"
      @dragstart="startDrag($event, item)">
      {{ item.title }}
    </div>
  </div>
  </div>


</div>
</q-page>
</template>



<script lang="ts" setup >
import { api } from 'src/boot/axios';
import { onBeforeMount, onErrorCaptured, ref } from 'vue';
import { Task } from '../components/models'



const tasks = ref<Task[]>([])

  api.get('tasks').then(res => {
  tasks.value = res.data;
  console.log(res.data);

});

const error = ref<Error | null>(null)
onErrorCaptured(e => {

  error.value = e
  return false
})

onBeforeMount(async  ()=>{
  api.get('tasks').then(res => {
  tasks.value = res.data;
  console.log(res.data);

});
})

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
    api.patch('tasks', item )

  }
}

</script>

<style lang="scss" scoped>
.drop-zone{
  height: 80vh;
  width: 350px;
}
.q-scroll-area{
  height: 60vh;
}
</style>
