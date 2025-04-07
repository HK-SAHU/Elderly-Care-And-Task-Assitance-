import { useState, useEffect, useRef } from 'react';
import { FaUser, FaPaperPlane, FaImage, FaSmile, FaEllipsisV } from 'react-icons/fa';
import './Chat.css';

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Simulate fetching contacts from API
    const mockContacts = [
      { id: 1, name: 'John Doe', status: 'online', avatar: null, unread: 2, lastMessage: 'Are you available tomorrow?', lastMessageTime: '10:30 AM' },
      { id: 2, name: 'Sarah Johnson', status: 'offline', avatar: null, unread: 0, lastMessage: 'I\'ll bring the groceries at 5pm', lastMessageTime: 'Yesterday' },
      { id: 3, name: 'Dr. Robert Wilson', status: 'online', avatar: null, unread: 0, lastMessage: 'Your next appointment is on Friday', lastMessageTime: 'Yesterday' },
      { id: 4, name: 'Mary Smith', status: 'online', avatar: null, unread: 5, lastMessage: 'Can you help me with the medication?', lastMessageTime: 'Monday' },
      { id: 5, name: 'Volunteer Group', status: 'group', avatar: null, unread: 0, lastMessage: 'New volunteer available in your area', lastMessageTime: 'Tuesday' }
    ];
    
    setContacts(mockContacts);
    
    // Set first contact as active by default
    if (mockContacts.length > 0) {
      setActiveContact(mockContacts[0]);
      
      // Load messages for the active contact
      loadMessages(mockContacts[0].id);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    scrollToBottom();
  }, [messages]);

  const loadMessages = (contactId) => {
    // Simulate fetching messages from API
    const mockMessages = [
      { id: 1, senderId: contactId, text: 'Hello, how are you doing today?', timestamp: '10:00 AM' },
      { id: 2, senderId: 'me', text: 'I\'m doing well, thank you! How about you?', timestamp: '10:05 AM' },
      { id: 3, senderId: contactId, text: 'I\'m good too. I wanted to check if you need any help with groceries this week?', timestamp: '10:10 AM' },
      { id: 4, senderId: 'me', text: 'Yes, that would be great. I need some vegetables and milk.', timestamp: '10:15 AM' },
      { id: 5, senderId: contactId, text: 'No problem! I can bring them tomorrow afternoon. Is 3 PM good for you?', timestamp: '10:20 AM' },
      { id: 6, senderId: 'me', text: 'Perfect, thank you so much for your help!', timestamp: '10:25 AM' },
      { id: 7, senderId: contactId, text: 'Are you available tomorrow?', timestamp: '10:30 AM' }
    ];
    
    setMessages(mockMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (contact) => {
    setActiveContact(contact);
    loadMessages(contact.id);
    
    // Mark messages as read
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    
    setContacts(updatedContacts);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to a backend service
    const newMsg = {
      id: messages.length + 1,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate response after 1 second
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        senderId: activeContact.id,
        text: 'I got your message. I\'ll get back to you soon!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, response]);
    }, 1000);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-search">
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`contact-item ${activeContact?.id === contact.id ? 'active' : ''}`}
              onClick={() => handleContactClick(contact)}
            >
              <div className="contact-avatar">
                {contact.avatar ? (
                  <img src={contact.avatar} alt={contact.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {contact.name.charAt(0)}
                  </div>
                )}
                <span className={`status-indicator ${contact.status}`}></span>
              </div>
              
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-last-message">{contact.lastMessage}</div>
              </div>
              
              <div className="contact-meta">
                <div className="contact-time">{contact.lastMessageTime}</div>
                {contact.unread > 0 && (
                  <div className="unread-badge">{contact.unread}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="chat-main">
        {activeContact ? (
          <>
            <div className="chat-header">
              <div className="chat-contact-info">
                {activeContact.avatar ? (
                  <img src={activeContact.avatar} alt={activeContact.name} className="header-avatar" />
                ) : (
                  <div className="header-avatar-placeholder">
                    {activeContact.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="header-name">{activeContact.name}</div>
                  <div className="header-status">{activeContact.status === 'online' ? 'Online' : 'Offline'}</div>
                </div>
              </div>
              
              <div className="chat-actions">
                <button className="action-button">
                  <FaEllipsisV />
                </button>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.senderId === 'me' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-time">{message.timestamp}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input" onSubmit={handleSendMessage}>
              <button type="button" className="input-button">
                <FaSmile />
              </button>
              <button type="button" className="input-button">
                <FaImage />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="send-button">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-icon">
              <FaUser />
            </div>
            <h3>Select a contact to start chatting</h3>
            <p>Choose from your existing conversations or start a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;