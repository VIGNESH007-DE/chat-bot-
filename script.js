const apiKey = "AIzaSyAxjdiv-dbGQj2Js8rDt8ZKTc2vdPaCTC0"; // 🔥 Replace with your Gemini API key

async function chatWithGemini(userInput) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userInput }] }]
        })
    });

    const data = await response.json();
    console.log("Gemini API Response:", data);

    if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text; // Extract chatbot response
    } else {
        return "⚠️ No response from Gemini API.";
    }
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    // Display user message
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p class="message user">You: ${userInput}</p>`;

    // Get Gemini API response
    chatWithGemini(userInput).then(response => {
        chatbox.innerHTML += `<p class="message bot">Gemini: ${response}</p>`;
        document.getElementById("userInput").value = ""; // Clear input
    });
}
