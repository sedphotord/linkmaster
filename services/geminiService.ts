import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBio = async (name: string, keywords: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: No API Key";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Escribe una biografía profesional, corta y atractiva para un perfil de redes sociales (estilo Linktree).
      Nombre: ${name}
      Palabras clave/Temas: ${keywords}
      Longitud: Máximo 180 caracteres.
      Tono: Amigable y profesional.
      Solo devuelve el texto de la biografía, nada más.`,
    });
    
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "No se pudo generar la biografía. Intenta nuevamente.";
  }
};

export const optimizeProductDescription = async (productName: string, currentDesc: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: No API Key";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Mejora la siguiente descripción de producto para que sea más vendedora y atractiva.
      Producto: ${productName}
      Descripción actual: ${currentDesc || "Sin descripción"}
      Longitud: Máximo 2 frases concisas.
      Idioma: Español.
      Solo devuelve el texto mejorado.`,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error optimizing description:", error);
    return currentDesc;
  }
};