
import { GoogleGenAI, Type } from "@google/genai";

// Безопасное получение API ключа
const getApiKey = () => {
  try {
    return typeof process !== 'undefined' ? process.env.API_KEY : null;
  } catch (e) {
    return null;
  }
};

export async function getTourRecommendation(query: string) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
        return "Интеллектуальный помощник в режиме оффлайн. Мы скоро вернемся!";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Вы — интеллектуальный ассистент "04travel.ru", эксперт по Алтаю. 
      Пользователь спрашивает: "${query}". 
      Дайте короткую, вдохновляющую рекомендацию, опираясь на дух Organic Minimalism и глубокое знание региона. 
      Максимум 3 предложения. Используйте эмпатичный тон.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Прошу прощения, я задумался о красоте гор. Могу ли я помочь вам подобрать идеальный маршрут?";
  }
}

export async function categorizeUserVibe(userStory: string) {
    try {
      const apiKey = getApiKey();
      if (!apiKey) return { vibe: "Nature Connection", description: "Стремление к чистоте и гармонии." };

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Определите "вайб" путешественника по его описанию: "${userStory}". 
        Верните JSON с одним из тегов: "Active Detox", "Romantasy Retreats", "Deep Focus", "Nature Connection".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              vibe: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["vibe", "description"]
          }
        },
      });
      return JSON.parse(response.text);
    } catch (e) {
        console.error("Vibe Analysis Error:", e);
        return { vibe: "Nature Connection", description: "Стремление к чистоте и гармонии." };
    }
}
