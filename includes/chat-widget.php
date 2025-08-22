<div id="chat-widget" class="chat-widget">
    <div class="chat-toggle" id="chat-toggle">
        <i data-lucide="message-circle" class="chat-icon"></i>
        <span class="chat-notification" id="chat-notification">1</span>
    </div>
    
    <div class="chat-window" id="chat-window">
        <div class="chat-header">
            <div class="chat-header-info">
                <div class="chat-avatar">
                    <i data-lucide="bot" class="avatar-icon"></i>
                </div>
                <div class="chat-info">
                    <h4 class="chat-title">ИИ-ассистент FLEXNET</h4>
                    <span class="chat-status">В сети</span>
                </div>
            </div>
            <div class="chat-header-actions">
                <button class="chat-action-btn" id="chat-minimize" aria-label="Свернуть">
                    <i data-lucide="minus" class="action-icon"></i>
                </button>
            </div>
        </div>
        
        <div class="chat-messages" id="chat-messages">
            <div class="message ai-message">
                <div class="message-content">
                    <p>Привет! Я ИИ-ассистент FlexNet Digital. Как дела? Чем могу помочь?</p>
                </div>
                <div class="message-time">
                    <?php echo date('H:i'); ?>
                </div>
            </div>
        </div>
        
        <div class="chat-input-area">
            <div class="chat-input-container">
                <textarea 
                    id="chat-input" 
                    class="chat-input" 
                    placeholder="Введите сообщение..."
                    rows="1"
                ></textarea>
                <button id="chat-send" class="chat-send-btn" aria-label="Отправить">
                    <i data-lucide="send" class="send-icon"></i>
                </button>
            </div>
        </div>
        
        <div class="chat-typing" id="chat-typing" style="display: none;">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="typing-text">Ассистент печатает...</span>
        </div>
    </div>
</div>