// Import the Google AI SDK
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyCszKRifG-wkMtH62EFgM4MYMvQpCdfqts";
const genAI = new GoogleGenerativeAI(API_KEY);

// If this 404s, change the model name
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

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
    const response = await result.response;
    const botText = response.text();

    chatBox.removeChild(chatBox.lastChild);
    appendMessage("bot", botText);
  } catch (error) {
    chatBox.removeChild(chatBox.lastChild);
    appendMessage("bot", "ERROR code 404");
  }
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender);
  msgDiv.innerHTML = `<strong>${sender === "user" ? "You" : "EthaNet"}:</strong> ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", getResponse);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getResponse();
});