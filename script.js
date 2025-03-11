async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="user-message">${userInput}</p>`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0]?.message?.content || "No response from AI.";

        chatBox.innerHTML += `<p class="bot-message">${botMessage}</p>`;
    } catch (error) {
        console.error("Chatbot Error:", error);
        chatBox.innerHTML += `<p class="bot-message">Error: ${error.message}</p>`;
    }

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
