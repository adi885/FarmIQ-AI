
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import MessageComponent from './Message';
import Spinner from './Spinner';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} />
        ))}
        {isLoading && <Spinner />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
