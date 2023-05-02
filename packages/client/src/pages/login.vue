<template>
  <div class="fit row wrap justify-between q-pa-xl">
    <div class="text-message-section column wrap content-center justify-center">
      <div class="q-px-auto column self-center text-center text-h3">
        <p>{{ $t('welcomeBackStudent') }};</p>
        <p>{{ $t('continueTracking') }}</p>
        <p>{{ $t('yourTasks') }}</p>
      </div>
    </div>
    <div class="column content-center justify-center">
      <q-card
        class="full-width shadow-24 q-px-md q-mx-md column self-center rounded-borders"
      >
        <q-card-section>
          <q-form class=" form q-pt-xl">
            <q-input
              v-model="email"
              square
              outlined
              clearable
              type="email"
              class="text-red q-pa-md"
              :label="$t('email')"
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
              :label="$t('password')"
            >
              <template #prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="align-center column q-px-lg">
          <q-btn
            unelevated
            dense
            size="lg"
            color="secondary"
            class="fit justify-center text-white q-pa-lg text-size-md text-capitalize"
            :label="$t('login')"
            @click="submit"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
          <p>
            <span
              clickable
              class="cursor-pointer text-primary"
              @click="navigateToRegistration()"
              >{{ $t('createAnAccount')}}?</span
            >
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();

const password = ref('');
const email = ref('');

const router = useRouter();

function submit() {
  api
    .post('auth/login', { email: email.value, password: password.value })
    .then((response) => {
      console.log(response);

      if (
        response.status >= 200 &&
        response.status < 300 &&
        response.data.access_token &&
        response.data.userData
      ) {
        auth.set(response.data.access_token, response.data.userData);
      }
      router.push({ name: 'projects' });
    });
}

function navigateToRegistration() {
  router.push({ name: 'signup' });
}
</script>

<style lang="scss" scoped>

.form{
  width: 350px;
}
.text-message-section {
  width: 40vw;

  margin: 0 auto;
}

.text-message-section {
  width: 50vw;
}
</style>
