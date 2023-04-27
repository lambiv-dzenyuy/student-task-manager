<template>
  <div class="row wrap justify-between q-pa-xl">
    <div class=" justify-center items-center content-start">
      <q-card class="shadow-24 q-pl-none form rounded-borders">
        <q-card-section
          header
          class="text-black center text-center text-h5 text-grey-8"
          >Create an account</q-card-section
        >
        <q-card-section>
          <q-form class="q-px-sm">
            <q-input
              v-model="data.firstName"
              dense
              square
              outlined
              clearable
              type="text"
              class="text-red q-pa-md"
              label="First Name"
            >
            </q-input>
            <q-input
              v-model="data.lastName"
              dense
              square
              outlined
              clearable
              type="text"
              class="text-red q-pa-md"
              label="Last Name"
            >
            </q-input>
            <q-input
              v-model="data.email"
              dense
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
              dense
              square
              clearable
              lazy-rules
              bordered
              outlined
              class="text-red q-pa-md"
              type="password"
              label="Password"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input
              v-model="repeatedPassword"
              dense
              square
              clearable
              lazy-rules
              bordered
              outlined
              class="text-red q-pa-md"
              type="password"
              label="re-enter Password"
            >
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
            @click="submit"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
          <p class="text-primary cursor-pointer" @click="navigateToLogin()">
            Already have an account?
          </p>
        </q-card-section>
      </q-card>
    </div>

    <div class="column q-pa-xl q-pa-xl landing-image text-message-section">
      <div class="q-px-auto q-pb-xl text-center text-h3">
        <p>Start Tracking</p>
        <p>Your Tasks</p>
      </div>
      <q-img
        src="/public/icons/landing.avif"
        class="q-ml-xl q-pa-xl float-left"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Student } from 'src/components/models';

import { useQuasar } from 'quasar';

const $q = useQuasar();

function triggerNotification(type: string, message: string) {
  $q.notify({
    type: type,
    message: message
    // position: 'top-right',
  });
}

const password = ref('');
const repeatedPassword = ref('');
const data = ref<Student>({} as Student);

const router = useRouter();

function navigateToLogin() {
  router.push({ name: 'login' });
}

function submit() {
  api
    .post('user', { ...data.value, password: password.value, avatar: 'dfa' })
    .then((response) => {
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        triggerNotification('positive', 'Account created successfully');
      } else {
        triggerNotification('negative', String(response.status) as string);
      }
      router.push({ name: 'login' });
    });
}
</script>

<style lang="scss" scoped>
.form {
  width: 400px;
}

.landing-image {
  width: 40%;
  height: 50%;
}
</style>
