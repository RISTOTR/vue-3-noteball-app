<template>
  <div 
     class="card mb-4">
      <div class="card-content">
        <div class="content">
          {{ note.content }}
          <div class="columns is-mobile has-text-grey-light">
            <small class="column has-text-left">{{ dateFormatted }}</small>
            <small class="column has-text-right">{{ characterLength }}</small>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink
          :to="`/editNote/${ note.id }`"
          href="#" 
          class="card-footer-item">Edit
        </RouterLink>
        <a 
        @click.prevent="modals.deleteNote = true"
        href="#"
         class="card-footer-item">Delete</a>
      </footer>
      <ModalDeleteNote 
      v-model="modals.deleteNote"
      v-if="modals.deleteNote"
      :noteId="note.id" />
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useStoreNotes } from '../../stores/storeNotes.js'
import { RouterLink } from 'vue-router'
import ModalDeleteNote from './ModalDeleteNote.vue';
import { useDateFormat } from '@vueuse/core'

const storeNotes = useStoreNotes()

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
})

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD-MM-YYYY @ HH:mm').value
})

// MODALS
const modals = reactive({
  deleteNote: false
})

</script>

<style scoped>
.card-footer {
    border-top: 1px solid #42b883;
  }
  .card-footer-item:not(:last-child) {
    border-right: 1px solid #42b883;
  }
  .card .content {
    color: #fff;
  }
  .card-footer-item:hover {
    color: white;
  }
  </style>