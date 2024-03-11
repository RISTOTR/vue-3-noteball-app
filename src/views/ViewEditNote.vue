<template>
  <div class="edit-note">
    <AddEditNote 
    v-model="noteContent"
    ref="addEditNoteRef"
    placeholder="No note was found. Please try again"
    labelText="EDIT NOTE"
    >
      <template #buttons>
        <button 
        @click="$router.back()"
          class="button return"
          >GO BACK</button>
        <button 
        @click="handleSaveClicked"
          class="button is-link"
          :disabled="!noteContent"
          >SAVE NOTE</button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '../components/notes/AddEditNote.vue'
import { useStoreNotes } from '../stores/storeNotes'

const route = useRoute()
const router = useRouter()
const noteContent = ref('')

const storeNotes = useStoreNotes();
storeNotes.currentNoteId = route.params.id;
noteContent.value = storeNotes.getNoteContent;

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}

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
  .card .content {
    color: #fff;
  }
  .button.is-link {
    background-color: #FFD706;
    border-color:  #FFD706;
    color: black;
    font-weight: bold;
  }
  .button.is-link:hover {
    background-color: #fbeda6;
  }
  .button.return {
    background-color: #42b883;
    border-color: #42b883;
    color: black;
    font-weight: bold;
    margin-right: 8px;
  }
  .button.return:hover {
    background-color: #73bc9b;
  }
  .button {
    min-width: 123px
  }
  
</style>