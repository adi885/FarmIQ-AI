
import React from 'react';
import type { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import StructuredResponse from './StructuredResponse';

interface MessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
        K
    </div>
);

const BotIcon = () => (
     <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
        AI
    </div>
);


const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  // Check for the new structured format markers
  const isStructured = message.role === 'model' && message.text.includes('[TITLE]');

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <BotIcon />}
      <div
        className={`max-w-xl ${
          isUser
            ? 'bg-orange-100 text-gray-800 rounded-xl rounded-br-none p-4 shadow-sm'
            : isStructured ? 'w-full' : 'bg-white text-gray-700 rounded-xl rounded-bl-none p-4 shadow-sm'
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="User upload"
            className="rounded-lg mb-3 max-w-xs h-auto"
          />
        )}
        <div className="text-gray-800">
          {isStructured ? (
             <StructuredResponse text={message.text} />
          ) : (
             <ReactMarkdown>{message.text}</ReactMarkdown>
          )}
        </div>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default MessageComponent;