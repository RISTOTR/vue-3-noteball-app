import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from '../js/firebase'
import { useStoreAuth } from './storeAuth';

let notesCollectionRef
let notesCollectionQuery
let storeAuth
let getNotesOnSnapshot = null

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = ref([])

  const notesLoaded = ref(false)

  async function addNote(newNoteContent) {
    let currentDate = new Date().getTime()
    let date = currentDate.toString()
    let note = {
      date: date,
      content: newNoteContent
    }

    // CON EL ID CREADO POR FIRESTORE
    const docRef = await addDoc(notesCollectionRef, {
      content: newNoteContent,
      date
    });

    await updateDoc(
      docRef, 
      {
        id: docRef.id
      }
    )

    // ID CREADO AQUI
    // await setDoc(doc(db, 'notes', id), note);

    // this.notes.unshift(note)

  }

  function init() {

    storeAuth = useStoreAuth()

    notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
    notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
    this.getNotes()
  }

  async function getNotes() {
    // const querySnapshot = await getDocs(collection(db, 'notes'));
    // querySnapshot.forEach((doc) => {
    //   let note = {
    //     id: doc.id,
    //     content: doc.data().content
    //     }
    //     this.notes.push(note)
    // });

    // if(getNotesOnSnapshot) getNotesOnSnapshot()

    getNotesOnSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let notes = []
      querySnapshot.forEach((doc) => {
        let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date
              }
          notes.push(doc.data(note));
        });
        this.notes = notes
      });
      this.notesLoaded = true
  }

  function clearNotes() {
    this.notes = []
    if(getNotesOnSnapshot) getNotesOnSnapshot()
  }

  async function deleteNote(idToDelete) {
    await deleteDoc(doc(db, 'users', storeAuth.user.id, 'notes', idToDelete))
    // this.notes = this.notes.filter(note => note.id != idToDelete)
  }
  async function updateNote(id, content) {
    const updatetRef = doc(db, 'users', storeAuth.user.id, 'notes', id)
    await updateDoc(updatetRef, {
      content
    });
    // let index = this.notes.findIndex(note => {
    //   return note.id === id
    // })
    // this.notes[index].content = content
  }

  const currentNoteId = ref(null);
  const getNoteContent = computed(() => {
      return notes.value.filter((note) => note.id === currentNoteId.value)[0].content;
  });

  const totalNotesCount = computed(() => {
    
    return notes.value.length
  });

  const totalCharactersCount = computed(() => {
    let count = 0
    notes.value.forEach(note => {
      count += note.content.length
    })
    return count
  })

  return { notes, addNote, deleteNote, getNoteContent, currentNoteId, updateNote, totalNotesCount, totalCharactersCount, init, getNotes, notesLoaded, clearNotes }
})