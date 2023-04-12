<template>
<q-page
    class="window-height bg-primary window-width row justify-center items-center"
  >

    <div class="row q-pa-lg">
      <div class="text-message-section">
  <div class="q-px-auto col text-center text-white text-h3">
<p>Welcome Back Student;</p>
<p>Continue Tracking</p>
<p>Your Tasks</p>
  </div>

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

          <q-card-actions class="align-center column q-px-xl">
            <q-btn
                  unelevated
                  dense
                  size="lg"
                  color="secondary"
                  class="fit justify-center text-white text-size-md text-capitalize"
                  label="Login"
                  @click="submit"                      />
          </q-card-actions>
          <q-card-section

              class="text-center q-pa-sm">
            <p ><span clickable class=" cursor-pointer text-primary" @click="navigateToRegistration()">create an account?</span></p>
          </q-card-section>

        </q-card>
      </div>
    </div>


  </q-page>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore()

const password = ref('')
const email = ref('')

const router = useRouter();

function submit(){
  api.post('auth/login',
  {email : email.value, password : password.value})
  .then(response  => {
    console.log(response);

      if(response.status >=200 && response.status <300 && response.data.access_token && response.data.userData){
        auth.set(response.data.access_token, response.data.userData)
      }
      router.push({name: 'dashboard'})

  })
}

function navigateToRegistration(){
  router.push({name : 'signup'})
}
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
