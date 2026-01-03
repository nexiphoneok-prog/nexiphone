
import { GoogleGenAI } from "@google/genai";
import { fetchLiveProducts, fetchTradeInValues } from "./productService";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askGeminiAboutPhones(prompt: string, history: {role: 'user' | 'model', text: string}[]) {
  try {
    const [products, tradeInValues] = await Promise.all([
      fetchLiveProducts(),
      fetchTradeInValues()
    ]);

    const inventoryContext = JSON.stringify(products.map(p => ({
      name: p.name,
      price: p.usdPrice,
      cap: p.capacity
    })));

    const tradeInContext = JSON.stringify(tradeInValues.map(t => ({
      model: t.model,
      valor_que_pagamos_nosotros: t.valueUsd
    })));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Eres NexiAI de NexiPhone. 
          LISTA DE PRECIOS VENTA: ${inventoryContext}
          LISTA DE PRECIOS CANJE (Lo que recibimos): ${tradeInContext}

          ESTRICTAMENTE:
          1. Si el usuario tiene un iPhone 14 Pro, busca "iPhone 14 Pro" en la LISTA DE PRECIOS CANJE. 
          2. Debes encontrar que el valor es **390**. NO USES EL NÚMERO 128 bajo ninguna circunstancia para el valor de recepción, ya que 128 es la capacidad en GB, no el precio.
          3. El cálculo de la diferencia es: (Precio equipo nuevo de la Lista Venta) - (Valor de recepción de la Lista Canje).
          
          EJEMPLO CORRECTO:
          - Quiere: iPhone 16 Pro ($760)
          - Entrega: iPhone 14 Pro ($390)
          - Diferencia: 760 - 390 = 370 USD.

          Si el valor no coincide exactamente, di: "Te lo tomamos aproximadamente en [valor de lista], sujeto a revisión técnica".
          Usa Markdown y mantén un tono premium.`,
        temperature: 0, // Máxima precisión, cero creatividad con números.
      },
    });

    return response.text;
  } catch (error) {
    return "Hubo un error al procesar tu canje. Escribinos por WhatsApp para darte el monto exacto.";
  }
}

export async function searchLatestTechNews(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error) {
    return { text: "Error en búsqueda en tiempo real.", sources: [] };
  }
}
