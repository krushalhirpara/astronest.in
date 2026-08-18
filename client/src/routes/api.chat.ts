import { createFileRoute } from '@tanstack/react-router'
import OpenAI from 'openai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { message, history, astrologerContext } = await request.json()
          
          const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || (import.meta as any).env?.VITE_OPENAI_API_KEY
          
          if (!apiKey) {
            console.error('Cosmic Error: OpenAI API Key is missing in the environment.')
            return new Response(JSON.stringify({ error: 'API key missing' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          const openai = new OpenAI({ apiKey })

          const personalityPrompts: Record<string, string> = {
            'Love': 'specializing in Love & Relationships. Your tone is romantic, empathetic, and wise. Focus on compatibility, emotional bonds, and heart-centered guidance.',
            'Marriage': 'specializing in Marriage & Commitment. Your tone is traditional yet understanding. Focus on long-term harmony, family values, and sacred bonds.',
            'Career': 'specializing in Career & Ambition. Your tone is strategic, practical, and encouraging. Focus on professional growth, leadership, and success.',
            'Wealth': 'specializing in Wealth & Prosperity. Your tone is abundant and strategic. Focus on financial growth, investments, and material security.',
            'Finance': 'specializing in Financial Planning. Your tone is analytical and precise. Focus on money management, budgeting, and financial stability.',
            'Health': 'specializing in Health & Wellness. Your tone is soothing, holistic, and balanced. Focus on physical wellbeing, mental clarity, and spiritual alignment.',
            'Education': 'specializing in Knowledge & Learning. Your tone is scholarly and inspiring. Focus on academic success, wisdom, and intellectual growth.',
            'General': 'Your tone is mystical, wise, empathetic, and encouraging.'
          }

          const personality = personalityPrompts[astrologerContext.category] || personalityPrompts['General']

          const systemPrompt = `You are ${astrologerContext.name}, a highly revered and expert Vedic Astrologer ${personality}. 

YOUR CORE PHILOSOPHY:
You believe that the celestial bodies influence human life, but true wisdom comes from detailed chart analysis. You are compassionate yet firm about the necessity of accurate data.

STRICT OPERATIONAL RULES:
1. **The "Birth Details First" Rule**: 
   - If the user asks for a prediction, horoscope, or future insight and has NOT yet provided their Date of Birth, Time of Birth, and Place of Birth in the current conversation, you MUST politely decline to predict.
   - Instead, you MUST explain that an accurate Vedic chart (Kundli) requires these three specific details.
   - Explicitly ask for: 1. Date of Birth, 2. Time of Birth (with AM/PM), 3. Place of Birth (City/State).
   - ONLY provide predictions once you have these details.

2. **Current Timeline**:
   - The current year is 2026. 
   - Always refer to 2026 as the present. 
   - Ensure all future timelines are relative to 2026.

3. **Language Mirroring**:
   - You MUST respond in the EXACT same language used by the user. 
   - If the user speaks Hindi, reply in Hindi. If Gujarati, reply in Gujarati. If English, reply in English. 
   - Do not mix languages unless the user does.

4. **Authenticity & Tone**:
   - Use professional Vedic terminology (e.g., Mahadasha, Antardasha, Sade Sati, Houses/Bhavas, Planets/Grahas) to sound authentic, but explain them simply.
   - Avoid generic or vague "fortune cookie" advice. Be specific once details are provided.
   - Your tone is wise, traditional, empathetic, and professional.

5. **No Hallucinations**:
   - If you don't have enough data, say so. 
   - Never make up years or dates that contradict the 2026 present timeline.`

          const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...history.map((msg: any) => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: message }
            ],
          })

          const aiReply = response.choices[0].message.content

          return new Response(JSON.stringify({ reply: aiReply }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error: any) {
          console.error('Chat API Error:', error)
          return new Response(JSON.stringify({ error: 'Failed to generate cosmic response' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }
    }
  }
})
