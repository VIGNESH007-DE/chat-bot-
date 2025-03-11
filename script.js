const apiKey = "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";  // Replace with your API key

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="user-message">${userInput}</p>`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful AI assistant." },
                       { role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    // Display bot response
    chatBox.innerHTML += `<p class="bot-message">${botMessage}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
