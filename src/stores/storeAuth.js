import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/js/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { useStoreNotes } from './storeNotes'

export const useStoreAuth = defineStore('storeAuth', () => {

const user = ref({
})

  function init() {
    const storeNotes = useStoreNotes()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user.id = user.uid
        this.user.email = user.email
        this.router.push('/')
        storeNotes.init()
      } else {
        this.user = {}
        this.router.replace('/auth')
        storeNotes.clearNotes()
      }
    });
    
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
    const user = userCredential.user
    // console.log(user)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error.message)
    });
  }

  function logOutUser() {
    signOut(auth).then(() => {
      // console.log('sign out successfull')
    }).catch((error) => {
      console.log(error.message)
    });
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    }).catch((error) => {
      console.log(error.message)
    });
  }

  // async function addNote(newNoteContent) {
  //   let currentDate = new Date().getTime()
  //   let date = currentDate.toString()
  //   let note = {
  //     date: date,
  //     content: newNoteContent
  //   }

    // CON EL ID CREADO POR FIRESTORE
    // const docRef = await addDoc(collection(db, 'notes'), {
    //   content: newNoteContent,
    //   date
    // });

    // await updateDoc(
    //   docRef, 
    //   {
    //     id: docRef.id
    //   }
    // )

    // ID CREADO AQUI
    // await setDoc(doc(db, 'notes', id), note);

    // this.notes.unshift(note)

  // }
  // async function deleteNote(idToDelete) {
  //   await deleteDoc(doc(db, 'notes', idToDelete))
  //   // this.notes = this.notes.filter(note => note.id != idToDelete)
  // }
  // async function updateNote(id, content) {
  //   const updatetRef = doc(db, 'notes', id)
  //   await updateDoc(updatetRef, {
  //     content
  //   });
  //   // let index = this.notes.findIndex(note => {
  //   //   return note.id === id
  //   // })
  //   // this.notes[index].content = content
  // }

  // async function getNotes() {
  //   // const querySnapshot = await getDocs(collection(db, 'notes'));
  //   // querySnapshot.forEach((doc) => {
  //   //   let note = {
  //   //     id: doc.id,
  //   //     content: doc.data().content
  //   //     }
  //   //     this.notes.push(note)
  //   // });

  //   onSnapshot(notesCollectionQuery, (querySnapshot) => {
  //     let notes = []
  //     querySnapshot.forEach((doc) => {
  //       let note = {
  //             id: doc.id,
  //             content: doc.data().content,
  //             date: doc.data().date
  //             }
  //         notes.push(doc.data(note));
  //       });
  //       this.notes = notes
        
  //     });
  //     this.notesLoaded = true
  // }

  // const currentNoteId = ref(null);
  // const getNoteContent = computed(() => {
  //     return notes.value.filter((note) => note.id === currentNoteId.value)[0].content;
  // });

  // const totalNotesCount = computed(() => {
    
  //   return notes.value.length
  // });

  // const totalCharactersCount = computed(() => {
  //   let count = 0
  //   notes.value.forEach(note => {
  //     count += note.content.length
  //   })
  //   return count
  // })

  return { user, registerUser, logOutUser, loginUser, init }
})