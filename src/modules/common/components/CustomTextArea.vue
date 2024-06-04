<template>
  <div>
    <textarea
      id="description"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      @change="$emit('change', $event)"
      class="shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
      :class="[
        'form-control',
        {
          'border-red-400': error,
        },
      ]"
    ></textarea>
    <span v-if="error" class="text-red-600">{{ error }}</span>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue?: string;
  error?: string;
}
defineProps<Props>();
defineEmits(['update:modelValue', 'blur', 'change']);
</script>
<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
