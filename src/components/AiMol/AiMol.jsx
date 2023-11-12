import React, { useState } from 'react';
import './AiMol.css'
import DEFAULT_IMAGE_URL from '../Assets/me.png'

const API_TOKEN = process.env.REACT_APP_API_KEY

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  let [output, setOutput] = useState(DEFAULT_IMAGE_URL);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = inputValue;
    const response = await fetch(
      'https://api-inference.huggingface.co/models/prompthero/openjourney',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="ai-image-div">
      <div className="ai-image-header">Stable<span> Diffusion</span></div>
      <div className="ai-image">
          {loading && <div className="loading">Loading...</div>}
          {!loading && (
            <img src={output} alt="" />
          )}
      </div>
      <div className="ai-image-loading">
        <form className="ai-image-search" onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete='o'
            name="input"
            className="ai-image-search-input"
            placeholder="Describe what you want to see..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="ai-image-search-btn">
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageGenerationForm;
