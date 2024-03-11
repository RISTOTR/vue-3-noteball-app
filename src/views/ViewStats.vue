<template>
  <div class="container stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>STAT</th>
          <th>VALUE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Charaters</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
    v-model="loveNoteBalls"
    class="input"
    type="text"
    placeholder="Do you lo Noteballs"
    v-autofocus />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreNotes } from '../stores/storeNotes'
import { vAutofocus } from '../directives/vAutofocus'
import { useWatchCharacters } from '../use/useWatchCharacters'

const storeNotes = useStoreNotes()

const loveNoteBalls = ref('')

useWatchCharacters(loveNoteBalls, 10)
</script>

<style scoped>
input, table {
  background-color: #42b883;
  border-color: #42b883;
  color: black
}
</style>
