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
