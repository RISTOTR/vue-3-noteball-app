<template>
  <div class="notes">
    <AddEditNote 
    v-model="newNote"
    ref="addEditNoteRef"
    placeholder="Write a new note..."
    labelText="WRITE A NEW NOTE..."
    >
      <template #buttons>
        <button 
          @click="addNote"
          :disabled="!newNote"
          class="button is-link">ADD NEW NOTE</button>
      </template>
    </AddEditNote>

    <progress 
    v-if="!storeNotes.notesLoaded"
    class="progress is-small is-primary" />

    <template v-else>
      <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      />

      <div v-if="!storeNotes.notes.length"
      class="is-size-5 has-text-white"
      >
        <p>You don´t have any notes yet..</p>
      </div>
      
    </template>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Note from '@/components/notes/Note.vue'
import AddEditNote from '@/components/notes/AddEditNote.vue'
import { useStoreNotes } from '../stores/storeNotes'
import { useWatchCharacters } from '../use/useWatchCharacters'

const storeNotes = useStoreNotes()

const newNote = ref('')
const addEditNoteRef = ref(null)

// console.log(storeNotes.notesLoaded)

const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  addEditNoteRef.value.focusTextarea()
}

const deleteNote = idToDelete => {
  console.log(notes.value)
  notes.value = notes.value.filter(note => {return note.id != idToDelete})
}

useWatchCharacters(newNote, 100)


// onMounted(() => {
//   // storeNotes.getNotes()
//   storeNotes.init()
// })


</script>

<style scoped>
  .card {
    background-color: #242424;
    border: 1px solid #42b883;
    border-radius: 0.25rem;
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
    color: #fff;
    max-width: 100%;
    position: relative;
  }
  .card-footer {
    border-top: 1px solid #42b883;
  }
  .card-footer-item:not(:last-child) {
    border-right: 1px solid #42b883;
  }
  .card .content {
    color: #fff;
  }
  .button.is-link {
    background-color: #FFD706;
    color: black;
    font-weight: bold;
  }
  .button.is-link:hover {
    background-color: #fbeda6;
  }
</style>