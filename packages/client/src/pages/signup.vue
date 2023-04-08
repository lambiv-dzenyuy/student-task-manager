<template>
  <q-page
      class="window-height bg-primary window-width row justify-center items-center"
    >

      <div class="row q-pa-lg">

        <div class="col  ">
          <q-card class="shadow-24 form rounded-borders" >
            <q-card-section header class="text-black center text-center text-h5 text-grey-8">Create an account</q-card-section>

            <q-card-section>


              <q-form class="q-px-sm ">
                <q-input

v-model="email"
square
outlined
clearable
type="text"
class="text-red q-pa-md"
label="First Name"

>
</q-input>
<q-input

v-model="email"
square
outlined
clearable
type="text"
class="text-red q-pa-md"
label="Last Name"

>

</q-input>
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
                <q-input

                         v-model="password"
                         square
                         clearable
                         lazy-rules
                         bordered
                         outlined
                         class="text-red q-pa-md"
                         type="password"
                         label="re-enter Password">

                  <template #prepend>
                    <q-icon name="lock" />
                  </template>

                </q-input>

              </q-form>
            </q-card-section>

            <q-card-actions class="q-px-lg">
              <q-btn
                    unelevated
                    size="md"
                    color="secondary"
                    class="full-width text-white text-capitalize"
                    label="sign up"
                    @click="submit"                      />
            </q-card-actions>
            <q-card-section

                class="text-center q-pa-sm">
              <p  class="text-primary">Already have an account?</p>
            </q-card-section>
          </q-card>
        </div>

        <div class="col q-ma-xl q-pa-xl  landing-image text-message-section">

    <div class="q-px-auto q-mb-xl text-center text-white text-h3">

  <p>Start Tracking</p>
  <p>Your Tasks</p>
    </div>
    <q-img src="../../public/icons/landing.avif" class="q-ml-xl q-pa-xl float-left"/>
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
  </script>

  <style lang="scss" scoped>
  .form{

    width:400px;

    color: white;
  }

  .text-message-section{
    // width: 50vw;
  }
  .landing-image{
    width: 40%;
    height: 50%;
  }
  </style>
