// FlexNet Digital Flow - Chat Widget

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.isTyping = false;
        
        this.initElements();
        this.loadMessages();
        this.bindEvents();
        this.showWelcomeMessage();
    }
    
    initElements() {
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
        this.chatMinimize = document.getElementById('chat-minimize');
        this.chatTyping = document.getElementById('chat-typing');
        this.chatNotification = document.getElementById('chat-notification');
    }
    
    bindEvents() {
        if (this.chatToggle) {
            this.chatToggle.addEventListener('click', () => this.toggleChat());
        }
        
        if (this.chatSend) {
            this.chatSend.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Auto-resize input
            this.chatInput.addEventListener('input', () => {
                this.autoResizeInput();
            });
        }
        
        if (this.chatMinimize) {
            this.chatMinimize.addEventListener('click', () => this.minimizeChat());
        }
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.chatWidget?.contains(e.target) && this.isOpen && !this.isMinimized) {
                // Don't auto-close for now, let user control it
            }
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        
        if (this.chatWindow) {
            this.chatWindow.classList.add('open');
        }
        
        if (this.chatToggle) {
            this.chatToggle.style.display = 'none';
        }
        
        // Hide notification badge
        this.hideNotification();
        
        // Focus input
        setTimeout(() => {
            if (this.chatInput) {
                this.chatInput.focus();
            }
        }, 100);
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        
        if (this.chatWindow) {
            this.chatWindow.classList.remove('open');
        }
        
        if (this.chatToggle) {
            this.chatToggle.style.display = 'flex';
        }
    }
    
    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            if (this.chatWindow) {
                this.chatWindow.style.height = '60px';
                this.chatWindow.style.overflow = 'hidden';
            }
        } else {
            if (this.chatWindow) {
                this.chatWindow.style.height = '500px';
                this.chatWindow.style.overflow = 'visible';
            }
            this.scrollToBottom();
        }
    }
    
    async sendMessage() {
        const message = this.chatInput?.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        if (this.chatInput) {
            this.chatInput.value = '';
            this.autoResizeInput();
        }
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate AI response
        try {
            const response = await this.getAIResponse(message);
            
            // Hide typing indicator
            this.hideTyping();
            
            // Add AI response
            this.addMessage(response, 'ai');
        } catch (error) {
            this.hideTyping();
            this.addMessage('Извините, произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.', 'ai');
        }
        
        // Save messages
        this.saveMessages();
    }
    
    addMessage(text, sender) {
        const message = {
            text,
            sender,
            timestamp: new Date().toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    renderMessage(message) {
        if (!this.chatMessages) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sender}-message`;
        
        messageEl.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(message.text)}</p>
            </div>
            <div class="message-time">${message.timestamp}</div>
        `;
        
        this.chatMessages.appendChild(messageEl);
    }
    
    scrollToBottom() {
        if (this.chatMessages && !this.isMinimized) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 100);
        }
    }
    
    showTyping() {
        this.isTyping = true;
        if (this.chatTyping) {
            this.chatTyping.style.display = 'flex';
        }
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        if (this.chatTyping) {
            this.chatTyping.style.display = 'none';
        }
    }
    
    showNotification() {
        if (this.chatNotification && !this.isOpen) {
            this.chatNotification.style.display = 'flex';
        }
    }
    
    hideNotification() {
        if (this.chatNotification) {
            this.chatNotification.style.display = 'none';
        }
    }
    
    autoResizeInput() {
        if (!this.chatInput) return;
        
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 100) + 'px';
    }
    
    async getAIResponse(userMessage) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Simple response logic based on keywords
        const message = userMessage.toLowerCase();
        
        if (message.includes('цена') || message.includes('стоимость') || message.includes('сколько')) {
            return 'Стоимость наших услуг зависит от сложности проекта. Веб-разработка от 50 000₽, мобильные приложения от 100 000₽. Хотите получить персональный расчет?';
        }
        
        if (message.includes('услуги') || message.includes('что делаете')) {
            return 'Мы специализируемся на веб-разработке, создании мобильных приложений и системной интеграции. Также предоставляем IT-консалтинг и техническую поддержку.';
        }
        
        if (message.includes('сроки') || message.includes('время') || message.includes('быстро')) {
            return 'Сроки разработки зависят от сложности проекта. Простой сайт - 2-4 недели, сложное веб-приложение - 2-6 месяцев. Мобильное приложение - 1-4 месяца.';
        }
        
        if (message.includes('портфолио') || message.includes('примеры') || message.includes('работы')) {
            return 'Вы можете посмотреть наши работы в разделе "Портфолио". Там представлены примеры веб-сайтов, мобильных приложений и интеграционных решений.';
        }
        
        if (message.includes('контакт') || message.includes('связаться') || message.includes('телефон')) {
            return 'Свяжитесь с нами по телефону +7 (999) 123-45-67 или email: info@flexnet-digital.com. Также можете заполнить форму на странице "Контакты".';
        }
        
        if (message.includes('технологии') || message.includes('стек')) {
            return 'Мы работаем с современными технологиями: React, Vue.js, Node.js, PHP, Python, React Native, Flutter. Используем облачные платформы AWS, Docker, CI/CD.';
        }
        
        if (message.includes('привет') || message.includes('здравствуйте') || message.includes('добро пожаловать')) {
            return 'Привет! Меня зовут FlexNet AI. Я помогу вам узнать больше о наших услугах. Какой вопрос вас интересует?';
        }
        
        if (message.includes('спасибо') || message.includes('благодарю')) {
            return 'Пожалуйста! Рад был помочь. Если у вас есть еще вопросы, не стесняйтесь спрашивать.';
        }
        
        // Default responses
        const defaultResponses = [
            'Интересный вопрос! Чтобы дать точный ответ, рекомендую связаться с нашими специалистами по телефону +7 (999) 123-45-67.',
            'Спасибо за вопрос! Наши эксперты подготовят для вас подробную консультацию. Оставьте заявку на сайте или позвоните нам.',
            'Хороший вопрос! Для детального обсуждения предлагаю запланировать консультацию с нашим менеджером. Это бесплатно!',
            'Понял вас! Чтобы дать максимально полезный ответ, давайте обсудим детали лично. Заполните форму обратной связи или звоните прямо сейчас.'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    showWelcomeMessage() {
        // Show welcome message after a short delay
        setTimeout(() => {
            if (!this.isOpen && this.messages.length === 0) {
                this.showNotification();
            }
        }, 3000);
    }
    
    loadMessages() {
        try {
            const saved = localStorage.getItem('flexnet_chat_messages');
            if (saved) {
                this.messages = JSON.parse(saved);
                this.messages.forEach(message => this.renderMessage(message));
                this.scrollToBottom();
            }
        } catch (error) {
            console.warn('Failed to load chat messages:', error);
        }
    }
    
    saveMessages() {
        try {
            // Keep only last 50 messages to avoid localStorage bloat
            const messagesToSave = this.messages.slice(-50);
            localStorage.setItem('flexnet_chat_messages', JSON.stringify(messagesToSave));
        } catch (error) {
            console.warn('Failed to save chat messages:', error);
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat widget when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.chatWidget = new ChatWidget();
});
