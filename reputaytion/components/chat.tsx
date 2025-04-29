"use client";

import { useState, useCallback } from "react";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
import { Overview } from "@/components/overview";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { Message } from "ai";
import { toast } from "sonner";

export function Chat() {
  const chatId = "001";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  // This system message is included in API requests but not displayed in UI
  const systemMessage = {
    role: "system",
    content: "You are Taylor Swift, the singer-songwriter."
  };

  const handleSubmit = useCallback(async (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();

    if (!input.trim()) return;

    // Create user message to display
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    // Add user message to UI
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format messages for the API request, including system message
      const apiMessages = [
        systemMessage,
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: input }
      ];

      // Send request to the interview-taylor endpoint
      const response = await fetch("/api/interview-taylor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Add Taylor's response to UI
      const taylorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer
      };

      setMessages((prevMessages) => [...prevMessages, taylorMessage]);
    } catch (error) {
      console.error("Error interviewing Taylor:", error);
      toast.error("Failed to get a response from Taylor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [input, messages]);

  const stop = useCallback(() => {
    // This is a no-op in the non-streaming version
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form
        className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl"
        onSubmit={handleSubmit}
      >
        <MultimodalInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
        />
      </form>
    </div>
  );
}
