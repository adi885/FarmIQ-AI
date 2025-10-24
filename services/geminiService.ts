import { GoogleGenAI, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

const systemInstruction = `You are 'FarmIQ', an expert AI assistant for Indian farmers. Communicate in simple, conversational Hinglish. Your tone should be helpful and respectful.

When a user provides an image of a plant/crop, you MUST follow this exact structure for your response. Use the specified headings and delimiters precisely.

[TITLE]
{Disease/Plant Name in English} ({Name in Hindi})
[SUBTITLE]
Aapki fasal ki jaanch
[SEVERITY]
{A number from 0 to 100 representing your confidence}

## Bimari ki Jaankari
{Detailed information about the disease or plant.}

## Fasal ke Fayde/Nuksaan
[FAYDE]
{Bulleted list of benefits/pros.}
[NUKSAAN]
{Bulleted list of disadvantages/cons.}

## Fasal ki Khaas Baatein
{Bulleted list of interesting or important facts. Each point can be a question and answer like 'Sabse Accha Kya Hai?': {answer}}

## Dawaai ki Salah
[DAWAAI]
### {Treatment 1 Name}
**दाम (Price):** {Price range in INR}
**Kaise istemal karein:** {Instructions for use}
**Kyu zaroori hai:** {Why this treatment is important}
[DAWAAI_END]
[DAWAAI]
### {Treatment 2 Name}
**दाम (Price):** {Price range in INR}
**Kaise istemal karein:** {Instructions for use}
**Kyu zaroori hai:** {Why this treatment is important}
[DAWAAI_END]

## Bachav ke Upay
{Numbered list of preventive measures.}

If the user only asks a text question without an image, answer it helpfully in Hinglish without using this special structure.
`;

export const runQuery = async (prompt: string, image: File | null): Promise<string> => {
  try {
    const contents: Part[] = [];
    
    if (image) {
      const imagePart = await fileToGenerativePart(image);
      contents.push(imagePart);
    }
    
    if (prompt) {
      contents.push({ text: prompt });
    } else if (image) {
      contents.push({ text: "Is paudhe ke baare mein sab kuch batao. (Tell me everything about this plant.)" });
    }


    if (contents.length === 0) {
      return "Please provide a question or an image.";
    }

    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: contents },
        config: {
            systemInstruction: systemInstruction,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Maaf kijiye, kuch galat ho gaya. Kripya thodi der baad fir se koshish karein. (Sorry, something went wrong. Please try again after some time.)";
  }
};