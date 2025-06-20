import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, getDoc, query, where, getDocs, doc, arrayRemove, arrayUnion } from "firebase/firestore";

export const registrarSitio = async (sitio) => {
    console.log(sitio)
    try {
        const docRef = await addDoc(collection(db, "sitios"), sitio);
        console.log("Sitio registrado con ID", docRef.id);
        // local storage guardar id
    } catch (error) {
        console.error("Error al registrtar sitio: ", error);
    }
};
export const verificarCredenciales = async (usuario, contrasena) => {
    try {
        const usuariosRef = collection(db, "usuarios");
        const q = query(usuariosRef, where("usuario", "==", usuario), where("contrasena", "==", contrasena));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const usuarioDoc = querySnapshot.docs[0]; // Obtén el primer resultado
            const usuarioData = { id: usuarioDoc.id, ...usuarioDoc.data() };
            console.log("Usuario autenticado:", usuarioData);
            return usuarioData;
        } else {
            console.log("Credenciales incorrectas");
            return null;
        }
    } catch (error) {
        console.error("Error al verificar credenciales:", error);
        return null;
    }
};

export const registrarUsuario = async (usuario) => {
    console.log(usuario)
    try {
        const docRef = await addDoc(collection(db, "usuarios"), usuario);
        console.log("Usuario registrado con ID", docRef.id);
        // local storage guardar id
    } catch (error) {
        console.error("Error al registrtar usuario: ", error);
    }
};

export const obtenerUsuario = async (usuarioId) => {
    try {
        const usuarioRef = doc(db, "usuarios", usuarioId);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
            console.log("Datos del usuario: ", usuarioSnap.data());
            return usuarioSnap.data(); //Regresa los datos del usuario
        } else {
            console.log("No se encontro el usuario");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener usuario: ", error);
        return null;
    }
};

export async function obtenerSitios() {
  const sitiosCol = collection(db, "sites");
  const sitiosSnapshot = await getDocs(sitiosCol);
  return sitiosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const obtenerFavoritos = async (usuarioId) => {
  const usuarioRef = doc(db, "usuarios", usuarioId);
  const usuarioSnap = await getDoc(usuarioRef);
  if (usuarioSnap.exists()) {
    return usuarioSnap.data().savedSites || [];
  }
  return [];
};

export const agregarSitio = async (usuarioId, sitioId) => {
  const usuarioRef = doc(db, "usuarios", usuarioId);
  await updateDoc(usuarioRef, {
    savedSites: arrayUnion(sitioId)
  });
};

export const quitarSitio = async (usuarioId, sitioId) => {
  const usuarioRef = doc(db, "usuarios", usuarioId);
  await updateDoc(usuarioRef, {
    savedSites: arrayRemove(sitioId)
  });
};