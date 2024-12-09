import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const { message } = await request.json();
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return Response.json({ response: text });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}