"use client"
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";


// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const newMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);

    try {
      // Initialize Gemini model and start chat
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat();
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      // Add AI response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: text },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">
                Chef-Ton
              </h1>
              
              {/* Chat messages */}
              <div className="h-[400px] overflow-auto mb-4 space-y-4 pr-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] ${
                        message.role === "user"
                          ? "bg-pink-400 text-white"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-purple-100 p-3 rounded-2xl text-purple-800">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="text-black flex-1 p-3 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}