
import React, { useState, useEffect } from 'react';
import type { Message } from './types';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { runQuery } from './services/geminiService';
import Welcome from './components/Welcome';
import ImagePreview from './components/ImagePreview';

// AppState can be 'welcome', 'preview', or 'chat'
type AppState = 'welcome' | 'preview' | 'chat';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppState>('welcome');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
  }

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setAppState('preview');
  };

  const cancelImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAppState('welcome');
  }

  const handleSendMessage = async (text: string, image: File | null) => {
    setAppState('chat');
    setIsLoading(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text,
    };

    if (image) {
      userMessage.image = await fileToBase64(image);
    }

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponseText = await runQuery(text, image);

    const botMessage: Message = {
      id: `model-${Date.now()}`,
      role: 'model',
      text: botResponseText,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsLoading(false);
    
    // Clear image after sending
    setImageFile(null);
    setImagePreview(null);
  };
  
  const handleAnalyseImage = () => {
      if (!imageFile) return;
      handleSendMessage("Is paudhe ke baare mein sab kuch batao.", imageFile);
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto h-full">
            {appState === 'welcome' && <Welcome onImageSelect={handleImageSelect} />}
            {appState === 'preview' && imagePreview && (
                <ImagePreview 
                    imagePreview={imagePreview} 
                    onCancel={cancelImage}
                    onAnalyse={handleAnalyseImage}
                    isLoading={isLoading}
                />
            )}
            {appState === 'chat' && <ChatWindow messages={messages} isLoading={isLoading} />}
        </div>
      </main>
      
      {appState === 'chat' && !isLoading && (
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      )}
      
      <footer className="text-center text-xs text-gray-400 p-2 bg-gray-100 border-t">
          Backbenchers Group dwara banaya gaya. Yeh sirf jaankari ke liye hai. Fasaloon ke liye hamesha kheti expert se salah lein.
      </footer>
    </div>
  );
};

export default App;