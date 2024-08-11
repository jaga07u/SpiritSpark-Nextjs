import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";

// Initialize the model
const genAI = new GoogleGenerativeAI("AIzaSyBucoxS0xDzS-N5f75gYHUfcT0isPb7T68");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const Text_detection = async (text) => {
  const prompt = "Is there any abuse, adult content, or extreme negativity in the above text? If yes, respond only 'yes', otherwise respond 'no'. Don't include any punctuation.";

  try {
    // Generate content based on the text and the prompt
    const result = await model.generateContent(`${text}\n\n${prompt}`);
    const responseText = result.response.text().trim();
    
    // Return the response text
    return responseText;
  } catch (error) {
    console.log('jkfk3354sssssssssssssssss');
    toast.error("Sorry you can't upload this type of content")
    return "yes";
    // console.error("Error generating content:", error);
    // throw error; // Propagate the error
  }
};

export { Text_detection };
