<template>
<q-page
    class="window-height bg-primary window-width row justify-center items-center"
  >

    <div class="row q-pa-lg">
      <div class="text-message-section">


</div>
      <div class="col  ">
        <q-card class="shadow-24 form rounded-borders" >

          <q-card-section>


            <q-form class="q-px-sm q-pt-xl">
              <q-input

                       v-model="email"
                       square
                       outlined
                       clearable
                       type="email"
                       class="text-red q-pa-md"
                       label="Email"

                       >
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>


              <q-input

                       v-model="password"
                       square
                       clearable
                       lazy-rules
                       bordered
                       outlined
                       class="text-red q-pa-md"
                       type="password"
                       label="Password">

                <template #prepend>
                  <q-icon name="lock" />
                </template>

              </q-input>

            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
                   unelevated
                   size="lg"
                   color="secondary"
                   class="full-width text-white text-size-md text-capitalize"
                     label="Login"                     />
          </q-card-actions>
          <q-card-section

              class="text-center q-pa-sm">
            <p  class="text-primary">Forgot Password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>


  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('')
const email = ref('')
</script>

<style lang="scss" scoped>
.form{

  width:400px;
  height:380px;
  color: white;
}

.text-message-section{
  width: 50vw;
}
</style>
