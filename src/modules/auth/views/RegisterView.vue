<template>
  <h1 class="text-2xl font-semibold mb-4">Crear Cuenta</h1>
  <form @submit.prevent="onRegister" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input v-model="myForm.fullName" type="text" id="name" name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input v-model="myForm.email" type="text" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input v-model="myForm.password" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input v-model="myForm.rememberMe" type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Recordarme</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidaste Tu contraseña?</a>
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Crear Cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">¿ Ya tienes una cuenta ?</RouterLink>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore()

const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const fullNameInputRef = ref<HTMLInputElement | null>(null)

const myForm = reactive({
  fullName: '',
  email: '',
  password: '',
  rememberMe: false
})


const onRegister = async () => {

  validateForm()

  const res = await authStore.register(myForm.fullName, myForm.email, myForm.password)

  if (res) return

  toast.error('Error al registrarse')


}

const validateForm = () => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }

  if (myForm.fullName === '') {
    return fullNameInputRef.value?.focus()
  }

  if (myForm.password === '') {
    return passwordInputRef.value?.focus()
  }


  if (myForm.rememberMe) {
    localStorage.setItem('email', myForm.email)
  } else {
    localStorage.removeItem('email')
  }
}

</script>