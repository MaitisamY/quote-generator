/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './assets/icon.png'
import Main from './components/Main'
import Footer from './components/Footer'
import { FaQuoteLeft, FaQuoteRight, FaRegCopy, FaCheck } from 'react-icons/fa'
import './App.css'

export default function App() {
  const [quotes, setQuote] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [tooltipState, setTooltipState] = useState(Array(quotes.length).fill(false));

  function toggleTooltip(index, isHovered) {
    setTooltipState((prev) => {
      const newState = [...prev];
      newState[index] = isHovered;
      return newState;
    });
  }

  function copyToClipboard(index) {
    const quoteContent = document.getElementById(`quote-content-${index}`).innerText;
    const quoteAuthor = document.getElementById(`quote-author-${index}`).innerText;
    const fullQuote = `${quoteContent} - ${quoteAuthor}`;

    const textarea = document.createElement('textarea');
    textarea.value = fullQuote;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/tags');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching quote tags:', error);
      }
    };

    fetchTags();  // Call the function when the component mounts
  }, [error]);

  const generateRandomQuote = async (e) => {
    e.preventDefault();
    const limit = e.target.limit.value;
    const tag = e.target.tags.value;

    if (!tag || tag === '1') {
      setError('Please select a quote type.');
      return;
    }

    else if (!limit || limit === '' || limit === null) {
      setError('Please enter a limit.');
      return;
    }

    else if (limit && limit < 1) {
      setError('Limit must be greater than 0.');
      return;
    }

    else if (limit && limit > 12) {
      setError('Limit must be less than 13.');
      return;
    }

    else {
      setError('');
      try {
        const response = await axios.get(`https://api.quotable.io/quotes/random?limit=${limit}&tags=${tag}`);
        const data = response.data;
  
        if (data.length > 0) {
          setQuote(data);
        } else {
          setQuote([{ content: 'No quotes found for the selected quote type.' }]);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuote([{ content: 'Error fetching quotes. Please try again.' }]);
      }
    }
  };
  return (
    <>
      <Main>
        <div id="permanent-box">
          <img alt="Language Learner logo" src={logo} width={100} />
          <h1>Quote Generator</h1>
          <div>
            <form onSubmit={generateRandomQuote}>
              <select name="tags" required>
                <option value="1">SELECT QUOTE TYPE</option>
                {tags && tags.map((tag, index) => (
                  <option key={index} value={tag.name}>{tag.name}</option>
                ))}
              </select>
              <label>Number of quotes <span>(1-12 digits)</span></label> &nbsp; 
              <input type="number" name="limit" defaultValue={1} /> 
              <button type="submit">Generate</button>
            </form>
          </div>
          {error && <p id="error">{error}</p>}
        </div>
        <div id="quote-box">
          {
            quotes.length > 0 ? (quotes.map((quote, index) => (
              <div id="quotes" key={index}>
                <p id={`quote-content-${index}`}>
                  <FaQuoteLeft /> &nbsp; {quote.content} &nbsp; <FaQuoteRight />
                </p>
                <span id={`quote-author-${index}`}>{quote.author}</span>
                {
                  quote.content === 'No quotes found for the selected tag.' ? null : (
                    <button 
                      onClick={() => copyToClipboard(index)}
                      onMouseOver={() => toggleTooltip(index, true)}
                      onMouseLeave={() => toggleTooltip(index, false)}
                    >
                      <FaRegCopy />
                    </button>
                  )
                }
                {copiedIndex === index && <i><FaCheck /> &nbsp; Copied</i>}
                {tooltipState[index] && <div className="tooltip">Copy to clipboard</div>}
              </div>
          ))) : (
              <h2>
                  Searched quotes will appear here. 
              </h2>
          )
          }
        </div>
      </Main>
      <Footer />
      <div id="below-300-pixels">
            <p>This site is designed for use on screens above 300 pixels only.</p>
      </div>
    </>
  )
}

/* Credits: https://quotable.io */
