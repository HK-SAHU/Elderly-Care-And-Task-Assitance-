import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    // Save language preference to backend if user is logged in
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // You can add API call here to save language preference
      }
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };
  
  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle variant="light" id="language-dropdown">
        <i className="fas fa-globe"></i> {i18n.language.toUpperCase()}
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        <Dropdown.Item 
          onClick={() => changeLanguage('en')}
          active={i18n.language === 'en'}
        >
          English
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={() => changeLanguage('es')}
          active={i18n.language === 'es'}
        >
          Español
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;