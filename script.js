// Import the Google AI SDK
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Consider storing API keys securely in a server or environment variables
const API_KEY = "AIzaSyCszKRifG-wkMtH62EFgM4MYMvQpCdfqts";
const genAI = new GoogleGenerativeAI(API_KEY);

let model;
try {
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} catch (error) {
  console.error("Error loading model:", error);
  alert("Failed to load AI model. Please check the configuration.");
}

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function getResponse() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";

  appendMessage("bot", "EthaNet is typing...");

  try {
    const result = await model.generateContent(text);
    if (!result || !result.response || !result.response.text) {
      throw new Error("Invalid response from model");
    }

    const botText = result.response.text();
    chatBox.removeChild(chatBox.lastChild);
    appendMessage("bot", botText || "I couldn't understand that.");
  } catch (error) {
    console.error("Error generating response:", error);
    chatBox.removeChild(chatBox.lastChild);
    appendMessage("bot", "I ran into an issue. Please try again.");
  }
}

function appendMessage(sender, text) {
  const sanitizedText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Basic Sanitation
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender);
  msgDiv.innerHTML = `<strong>${sender === "user" ? "You" : "EthaNet"}:</strong> ${sanitizedText}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", getResponse);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getResponse();
});