<template>
  <div class="fit row wrap justify-evenly">
    <div
      class="column justify-center items-center content-start q-pa-lg q-mx-lg"
    >
      <q-card class="shadow-24 form rounded-borders">
        <q-card-section
          header
          class="text-black center text-center text-h5 text-grey-8"
        >
          {{ $t('createAnAccount') }}
        </q-card-section>
        <q-card-section>
          <q-form class="q-px-sm">
            <q-input
              v-model="data.firstName"
              dense
              outlined
              clearable
              :label="$t('firstName')"
              :rules="[(value) => !!value || $t('firstNameIsRequired')]"
            >
            </q-input>
            <q-input
              v-model="data.lastName"
              dense
              outlined
              clearable
              :label="$t('lastName')"
              :rules="[(value) => !!value || $t('lastNameIsRequired')]"
            >
            </q-input>
            <q-input
              v-model="data.email"
              dense
              outlined
              clearable
              :label="$t('email')"
              :rules="[
                (value) => !!value || $t('emailIsRequired'),
                (value) => value.includes('@') || $t('notAValidEmail')
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
              :label="$t('password')"
              :rules="[(value) => !!value || $t('passwordIsRequired')]"
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
              :label="$t('confirmPassword')"
              :rules="[
                (value) => !!value || $t('passwordConfirmationRequired'),
                (value) =>
                  value === password ||
                  $t('passwordConfirmationDoesNotMatchPassword')
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
            :label="$t('signUp')"
            @click="submit"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
          <p class="text-primary cursor-pointer" @click="navigateToLogin()">
            {{ $t('alreadyHaveAnAccount') }}?
          </p>
        </q-card-section>
      </q-card>
    </div>
    <div
      class="column q-pa-lg landing-image justify-center items-center content-start q-mx-lg"
    >
      <div class="q-px-lg q-pb-xl text-left text-h3">
        <p>{{ $t('startTracking') }}</p>
        <p>{{ $t('yourTasks') }}</p>
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
