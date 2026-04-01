const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const messagesFile = path.join(dataDir, 'messages.json');

// Initialize messages file if it doesn't exist
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

// Read all messages from JSON file
const getMessages = () => {
  try {
    const data = fs.readFileSync(messagesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
};

// Write messages to JSON file
const saveMessages = (messages) => {
  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error saving messages:', error);
  }
};

// Add new message
const addMessage = (messageData) => {
  const messages = getMessages();
  const newMessage = {
    id: Date.now(),
    ...messageData,
    status: 'unread',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  messages.unshift(newMessage); // Add to beginning
  saveMessages(messages);
  return newMessage;
};

// Get message by ID
const getMessageById = (id) => {
  const messages = getMessages();
  return messages.find(msg => msg.id === parseInt(id));
};

// Delete message by ID
const deleteMessageById = (id) => {
  let messages = getMessages();
  const filtered = messages.filter(msg => msg.id !== parseInt(id));
  
  if (filtered.length === messages.length) {
    return false; // Not found
  }
  
  saveMessages(filtered);
  return true;
};

// Mark all unread as read
const markAllAsRead = () => {
  const messages = getMessages();
  const updated = messages.map(msg => ({
    ...msg,
    status: msg.status === 'unread' ? 'read' : msg.status,
    updated_at: msg.status === 'unread' ? new Date().toISOString() : msg.updated_at
  }));
  saveMessages(updated);
};

module.exports = {
  getMessages,
  saveMessages,
  addMessage,
  getMessageById,
  deleteMessageById,
  markAllAsRead
};
