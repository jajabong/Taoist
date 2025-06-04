// DOM Elements
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const languageSwitch = document.getElementById('languageSwitch');
const welcomeMessage = document.getElementById('welcomeMessage');
const sendButtonText = document.getElementById('sendButtonText');
const titleText = document.querySelector('.title-text');

// Current language (default: Chinese)
let currentLanguage = 'zh';

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
languageSwitch.addEventListener('click', toggleLanguage);

// Divination AI responses
const divinationResponses = {
    zh: [
        "根据易经的智慧，你所面临的情况似乎处于变化之中。记住，变化是唯一不变的真理。保持内心平静，顺应变化的节奏，你将找到前进的方向。",
        "道家讲究'无为而治'，这并非不作为，而是顺应自然。你的问题或许需要的不是强行解决，而是静心观察，让事情自然发展。",
        "《道德经》言：'道可道，非常道'。有些事无法用言语表达，需要你用心去感受。尝试在静默中寻找答案，而非外部的喧嚣中。",
        "八卦显示，你当前的处境如同'坎卦'，意味着你正面临挑战，但水总会找到出路。坚持不懈，你会克服困难。",
        "从心理学角度看，你的问题可能源于内在冲突。尝试接纳自己的矛盾情绪，理解它们的根源，和谐将随之而来。",
        "太极阴阳理论告诉我们，世间万物皆有阴阳两面。你的困境中同样蕴含着机遇，尝试从不同角度看待问题。",
        "紫微斗数显示，你目前处于一个自我探索的阶段。这是认识真我的宝贵时期，珍惜这段旅程。",
        "从现代心理学和古老智慧的交汇处看，你需要的可能是更多的自我关爱和接纳，而非寻求外部认可。"
    ],
    en: [
        "According to the wisdom of I Ching, your situation appears to be in a state of flux. Remember, change is the only constant truth. Maintain inner peace, follow the rhythm of change, and you will find your way forward.",
        "Taoism emphasizes 'governing by non-action,' which doesn't mean doing nothing, but rather following the natural course. Your problem may not need forced resolution, but patient observation, allowing things to unfold naturally.",
        "The Tao Te Ching says: 'The Tao that can be told is not the eternal Tao.' Some things cannot be expressed in words and require you to feel with your heart. Try finding answers in silence, not in external noise.",
        "The trigrams show that your current situation resembles the 'Kan' hexagram, meaning you're facing challenges, but water always finds its way. Persevere, and you will overcome difficulties.",
        "From a psychological perspective, your issue may stem from internal conflict. Try accepting your contradictory emotions, understand their roots, and harmony will follow.",
        "The Taiji Yin-Yang theory tells us that everything in the world has two aspects. Your difficulties also contain opportunities; try viewing the problem from different angles.",
        "The Purple Star Astrology indicates you're in a phase of self-exploration. This is a valuable period for knowing your true self, cherish this journey.",
        "At the intersection of modern psychology and ancient wisdom, what you may need is more self-love and acceptance, rather than seeking external validation."
    ]
};

// Initialize
function init() {
    // Set placeholder based on current language
    updatePlaceholders();
    
    // Focus on input field
    userInput.focus();
}

// Send message function
function sendMessage() {
    const message = userInput.value.trim();
    
    if (message) {
        // Display user message
        addMessage(message, 'user');
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after a delay (1-2 seconds)
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Get AI response
            const aiResponse = getAIResponse();
            
            // Display AI response
            addMessage(aiResponse, 'ai');
        }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
    }
}

// Add message to chat
function addMessage(text, sender) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    // If it's an AI message, add data attributes for translation
    if (sender === 'ai') {
        // Generate English version (for demo purposes)
        const englishText = getAIResponse('en');
        messageElement.setAttribute('data-en', englishText);
        messageElement.setAttribute('data-zh', text);
    }
    
    messageElement.textContent = text;
    
    // Add message to chat box
    chatBox.appendChild(messageElement);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.id = 'typingIndicator';
    
    // Add dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingIndicator.appendChild(dot);
    }
    
    // Add to chat box
    chatBox.appendChild(typingIndicator);
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get AI response
function getAIResponse(lang = currentLanguage) {
    const responses = divinationResponses[lang];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Toggle language
function toggleLanguage() {
    // Switch language
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    
    // Update button text
    languageSwitch.textContent = currentLanguage === 'zh' ? 'EN' : '中';
    languageSwitch.setAttribute('data-current', currentLanguage);
    
    // Update placeholders
    updatePlaceholders();
    
    // Update all messages with translation data attributes
    updateMessagesLanguage();
    
    // Update welcome message
    updateWelcomeMessage();
    
    // Update send button text
    updateSendButtonText();
    
    // Update title text
    updateTitleText();
}

// Update placeholders based on language
function updatePlaceholders() {
    const placeholder = currentLanguage === 'zh' ? 
        userInput.getAttribute('data-zh-placeholder') : 
        userInput.getAttribute('data-en-placeholder');
    userInput.placeholder = placeholder;
}

// Update all messages with the current language
function updateMessagesLanguage() {
    const messages = document.querySelectorAll('.ai-message');
    messages.forEach(message => {
        if (message.hasAttribute(`data-${currentLanguage}`)) {
            message.textContent = message.getAttribute(`data-${currentLanguage}`);
        }
    });
}

// Update welcome message
function updateWelcomeMessage() {
    if (welcomeMessage) {
        welcomeMessage.textContent = welcomeMessage.getAttribute(`data-${currentLanguage}`);
    }
}

// Update send button text
function updateSendButtonText() {
    if (sendButtonText) {
        sendButtonText.textContent = sendButtonText.getAttribute(`data-${currentLanguage}`);
    }
}

// Update title text
function updateTitleText() {
    if (titleText) {
        titleText.textContent = titleText.getAttribute(`data-${currentLanguage}`);
    }
}

// Initialize the app
init(); 