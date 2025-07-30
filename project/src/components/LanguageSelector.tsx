import React from 'react';
import { Code, FileCode, Globe } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: Code, color: 'bg-yellow-500' },
  { id: 'python', name: 'Python', icon: FileCode, color: 'bg-blue-500' },
  { id: 'java', name: 'Java', icon: FileCode, color: 'bg-red-500' },
  { id: 'html', name: 'HTML', icon: Globe, color: 'bg-orange-500' },
  { id: 'css', name: 'CSS', icon: Globe, color: 'bg-purple-500' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {languages.map((language) => {
        const Icon = language.icon;
        const isSelected = selectedLanguage === language.id;
        
        return (
          <button
            key={language.id}
            onClick={() => onLanguageChange(language.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isSelected
                ? `${language.color} text-white shadow-md transform scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{language.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;