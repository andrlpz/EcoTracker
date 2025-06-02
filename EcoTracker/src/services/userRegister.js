import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, getDoc, query, where, getDocs, doc } from "firebase/firestore";

export const registrarUsuario = async (sitio) => {
    console.log(sitio)
    try {
        const docRef = await addDoc(collection(db, "sitios"), sitio);
        console.log("Sitio registrado con ID", docRef.id);
        // local storage guardar id
    } catch (error) {
        console.error("Error al registrtar sitio: ", error);
    }
};

