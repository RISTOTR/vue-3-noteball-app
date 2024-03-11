<template>
  <div class="card mb-5 p-4">
    <label v-if="labelText" class="label has-text-white">{{ labelText }}</label>
      <div class="field">
        <div class="control">
          <textarea 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea has-background-custom-green" 
          :placeholder="placeholder"
          ref="textareaRef"
          v-autofocus
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
         <slot name="buttons" />
      </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { vAutofocus } from '../../directives/vAutofocus'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Write Something'
  },
  labelText: {
    type: String,
    default: "LABEL TEXT"
  }
})

const emit = defineEmits(['update:modelValue'])

const textareaRef = ref(null)

const focusTextarea = () => {
  textareaRef.value.focus()
}

defineExpose({
  focusTextarea
})


</script>