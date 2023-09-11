import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import './reset.css'
import Router from './components/layout/ui/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebase } from './utils/constants/firebase.constants'


// Initialize Firebase

const db = getFirestore(firebase.app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


const queryClien = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClien}>
      {/* <AuthProvider> */}

        <Router />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  </React.StrictMode>,
)
