import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { taskService } from '../../services/api';
import './VoiceTaskInput.css';

const VoiceTaskInput = ({ onTaskAdded }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  
  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    // Store recognition instance
    window.recognition = recognition;
    
    return () => {
      if (window.recognition) {
        window.recognition.abort();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (isListening) {
      window.recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      window.recognition.start();
      setIsListening(true);
    }
  };
  
  const handleSubmit = async () => {
    if (!transcript.trim()) return;
    
    try {
      // Parse the transcript to extract task details
      // This is a simple implementation - could be enhanced with NLP
      const taskData = {
        title: transcript,
        description: '',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
        priority: 'Medium'
      };
      
      const response = await taskService.createTask(taskData);
      setTranscript('');
      if (onTaskAdded) onTaskAdded(response.data);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    }
  };
  
  return (
    <div className="voice-task-input">
      <h3>Add Task Using Voice</h3>
      {error && <div className="error-message">{error}</div>}
      
      <div className="voice-controls">
        <Button 
          variant={isListening ? "danger" : "primary"}
          onClick={toggleListening}
          className="voice-button"
        >
          {isListening ? "Stop Listening" : "Start Speaking"}
        </Button>
      </div>
      
      {transcript && (
        <div className="transcript-container">
          <p><strong>Your task:</strong> {transcript}</p>
          <Button className='create-task' variant="success" onClick={handleSubmit}>
            Create Task
          </Button>
        </div>
      )}
      
      <div className="voice-instructions">
        <p>Speak clearly to create a new task. For example:</p>
        <ul>
          <li>"Buy groceries from the store"</li>
          <li>"Call doctor for appointment"</li>
          <li>"Take medication at 8pm"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceTaskInput;