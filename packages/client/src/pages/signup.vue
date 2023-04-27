<template>
  <div class="row wrap justify-between">
    <div
      class="column justify-center items-center content-start q-pa-lg q-mx-lg"
    >
      <q-card class="shadow-24 form rounded-borders">
        <q-card-section
          header
          class="text-black center text-center text-h5 text-grey-8"
          >Create an account</q-card-section
        >
        <q-card-section>
          <q-form class="q-px-sm q-pa-md">
            <q-input
              v-model="data.firstName"
              dense
              outlined
              clearable
              label="First Name"
              :rules="[(value) => !!value || 'First Name is required']"
            >
            </q-input>
            <q-input
              v-model="data.lastName"
              dense
              outlined
              clearable
              label="Last Name"
              :rules="[(value) => !!value || 'Last Name is required']"
            >
            </q-input>
            <q-input
              v-model="data.email"
              dense
              outlined
              clearable
              label="Email"
              :rules="[
                (value) => !!value || 'Email is required',
                (value) => value.includes('@') || 'Not a valid email'
              ]"
            >
              <template #prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              dense
              outlined
              clearable
              label="Password"
              :rules="[(value) => !!value || 'Password is required']"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-input
              v-model="repeatedPassword"
              dense
              clearable
              outlined
              type="password"
              label="Confirm Password"
              :rules="[
                (value) => !!value || 'Password Confirmation is required',
                (value) =>
                  value === password ||
                  'Password confirmation does not match password'
              ]"
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

    <div
      class="column q-pa-lg landing-image justify-center items-center content-start q-mx-lg"
    >
      <div class="q-px-lg q-pb-xl text-left text-h3">
        <p>Start Tracking</p>
        <p>Your Tasks</p>
      </div>
      <q-img src="/icons/landing.avif" class="q-ml-xl q-pa-xl float-left" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Student } from 'src/components/models';

import { appNotify } from 'src/components/notify';

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
        appNotify.success('Account created successfully');
      } else {
        appNotify.error(String(response.status) as string);
      }
      router.push({ name: 'login' });
    });
}
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
}
</style>
