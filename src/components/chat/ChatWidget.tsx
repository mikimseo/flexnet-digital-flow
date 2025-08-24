import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  className?: string;
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет! Я ИИ-ассистент FLEXNET. Расскажите о вашем проекте — я помогу подобрать подходящие решения.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("flexnet-chat-messages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (error) {
        console.error("Failed to load chat messages:", error);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("flexnet-chat-messages", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom within chat container only
  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  const sendToWebhook = async (userMessage: string, botReply: string) => {
    try {
      await fetch("https://my.flexnet.kz/webhook-test/acf44b2d-18c3-4bdf-b994-bee9899a22c7", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          user_message: userMessage,
          bot_reply: botReply,
          session_id: "demo-session",
          source: "flexnet-chat-widget",
          triggered_from: window.location.origin,
        }),
      });
    } catch (error) {
      console.error("Failed to send to webhook:", error);
    }
  };

  const sendMessage = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Send user message to n8n webhook immediately
      await sendToWebhook(userMessage.text, "");

      // Mock API call - replace with actual API integration
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: "demo-session",
        }),
      });

      let botReply = "";
      
      if (response.ok) {
        const data = await response.json();
        botReply = data.reply || "";
      } else {
        // Fallback responses for demo
        if (userMessage.text.toLowerCase().includes("сайт")) {
          botReply = "Отлично! Мы специализируемся на создании современных сайтов. Какой тип сайта вас интересует: лендинг, корпоративный сайт или интернет-магазин?";
        } else if (userMessage.text.toLowerCase().includes("цена") || userMessage.text.toLowerCase().includes("стоимость")) {
          botReply = "Стоимость зависит от сложности проекта. Лендинг от 150,000 тенге, корпоративный сайт от 300,000 тенге. Хотите получить точную оценку? Расскажите подробнее о задаче.";
        } else if (userMessage.text.toLowerCase().includes("срок")) {
          botReply = "Сроки разработки: лендинг 1-2 недели, корпоративный сайт 3-4 недели, интернет-магазин 4-6 недель. Всё зависит от технических требований.";
        } else {
          // No default response - message will be sent to webhook only
          setIsTyping(false);
          return;
        }
      }

      // Only show bot reply if there is one
      if (botReply) {
        // Simulate typing delay
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botReply,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 1500);
      } else {
        setIsTyping(false);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Извините, произошла ошибка. Попробуйте позже или свяжитесь с нами напрямую.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg btn-gradient"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card 
      className={cn(
        "fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col shadow-2xl",
        isMinimized && "h-14",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold">ИИ-ассистент FLEXNET</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.isUser
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-muted text-muted-foreground mr-4"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground max-w-[80%] p-3 rounded-lg text-sm mr-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите ваш вопрос..."
                className="min-h-[44px] max-h-24 resize-none"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="btn-primary"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}