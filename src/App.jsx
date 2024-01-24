/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './assets/icon.png'
import Main from './components/Main'
import Footer from './components/Footer'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import './App.css'

export default function App() {
  const [quotes, setQuote] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');


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
      setError('Please select a tag.');
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
          setQuote([{ content: 'No quotes found for the selected tag.' }]);
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
              <label>Number of quotes <span>(1-12 digits)</span></label> 
              <input type="number" name="limit" defaultValue={1} /> &nbsp;
              <button type="submit">Generate</button>
            </form>
          </div>
          {error && <p id="error">{error}</p>}
          {/* <ul>
              <li>Tag and limit selection is must.</li>
              <li>Limit must be between 1 and 12.</li>
              <li>Each time you hit generate button, a new set of quotes will be generated.</li>
              <li>If the selected tag does not contain the provided limit, then no quotes will be generated.</li>
          </ul> */}
        </div>
        <div id="quote-box">
          {
            quotes.length > 0 ? (quotes.map((quote, index) => (
              <div id="quotes" key={index}>
                <p>
                    <FaQuoteLeft /> &nbsp; {quote.content} &nbsp; <FaQuoteRight />
                </p>
                <span>{quote.author}</span>
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
