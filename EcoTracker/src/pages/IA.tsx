import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import OpenAI from "openai";
import './IA.css';

function IA() {
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState("")
  const [imagen, setImagen] = useState(null)

  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Best practice: use process.env.REACT_APP_OPENAI_API_KEY
    dangerouslyAllowBrowser: true
  });

  const analizarImagen = async (base64Image) => {
    setLoading(true);
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o", // Ensure you use a vision-capable model
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Dime en qué categoría de residuo entra el material de la imagen (papel y cartón, vidrio, envases de plástico y metal, residuos generales no reciclables, residuos orgánicos o composta, residuos peligrosos o electrónicos ). También dame una lista de 4 ideas para reusar el objeto como manualidades. Responde unicamente en un json con clasificacion ejemplo: {tipo: ´residuos peligrosos y electronicos} ideas: [ideas y pasos]´" },
              {
                type: "image_url",
                image_url: {
                  url: base64Image, // Must include data:image/jpeg;base64, prefix
                },
              },
            ],
          },
        ],
      });

      console.log("Respuesta de IA:", response.choices[0].message.content);
      let rawContent = response.choices[0].message.content;
      const cleanJsonString = rawContent.replace(/```json|```/g, "").trim();
      const objetoJson = JSON.parse(cleanJsonString);
      setRespuesta(objetoJson);
      { console.log(respuesta.ideas) }
      console.log("JSON Limpio:", objetoJson);
      // Convert the string into a real Javascript Object

      setRespuesta(objetoJson);

    } catch (error) {
      console.error("Error con OpenAI:", error);
    } finally {
      setLoading(false);
    }
  };

  const seleccionarImagen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result contains the base64 string
        setImagen(reader.result as any)
        analizarImagen(reader.result);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <IonPage>
      <IonContent className='fondo'>
        <h1 className='tituloIA'>Descubre qué tipo de clasificación es el objeto e ideas para reusarlo</h1>
        <button onClick={seleccionarImagen} disabled={loading} className='btnIA'>
          {loading ? 'Analizando...' : 'Subir y Describir Imagen'}
        </button>
        <img src={imagen} alt="tu imagen" className='fotoIA' />
        <div className='respuestaIA'>
          <p className='tipoIA'>tipo: {respuesta.tipo}</p>
          <div className='ideasIA'>
          <p>ideas: </p>
          <ul>
            {respuesta.ideas && respuesta.ideas.map((idea, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {idea}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default IA;
