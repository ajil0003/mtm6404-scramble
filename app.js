/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

function shuffleArray(source) {
    let arr = [...source];
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return typeof source === 'string' ? arr.join('') : arr;
}

const wordList = ['canada', 'brazil', 'france', 'italy', 'japan', 'australia','germany', 'mexico'];

function ScrambleGame() {
  const [currentWord, setCurrentWord] = React.useState('');
  const [correctWord, setCorrectWord] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [passes, setPasses] = React.useState(3);
  const [input, setInput] = React.useState('');
  const [wordsLeft, setWordsLeft] = React.useState([...wordList]);
  const [gameOver, setGameOver] = React.useState(false);

  // Debugging: Add console logs to check if function is triggered
  function checkAnswer(e) {
      e.preventDefault(); // Prevent form submission
      console.log('checkAnswer triggered');
      
      if (input.toLowerCase() === correctWord) {
          setScore(prevScore => prevScore + 1);
          setMessage('Correct! Next word.');
          getNextWord();
      } else {
          setStrikes(prevStrikes => prevStrikes + 1);
          setMessage('Wrong! Try again.');
          if (strikes + 1 >= 3) {
              setGameOver(true);
              setMessage('Game Over! Restart to try again.');
          }
      }
      setInput('');
  }

  // Debugging: Log passes button click
  function passWord() {
      console.log('passWord triggered');
      if (passes > 0) {
          setPasses(prevPasses => prevPasses - 1);
          setMessage('You passed. Next word!');
          getNextWord();
      } else {
          setMessage('No more passes left!');
      }
  }

  // Debugging: Log getNextWord function
  function getNextWord() {
      console.log('getNextWord triggered');
      
      if (wordsLeft.length === 0) {
          setGameOver(true);
          setMessage('Congratulations! You won!');
          return;
      }
      let index = Math.floor(Math.random() * wordsLeft.length);
      let newWord = wordsLeft[index];
      setWordsLeft(wordsLeft.filter((_, i) => i !== index));  // Remove guessed word
      setCorrectWord(newWord);
      setCurrentWord(shuffleArray(newWord));  // Shuffle and display new word
  }

  function restartGame() {
      console.log('restartGame triggered');
      setGameOver(false);
      setStrikes(0);
      setScore(0);
      setPasses(3);
      setMessage('');
      setWordsLeft([...wordList]);
      getNextWord();
  }

  React.useEffect(() => {
      console.log('useEffect triggered');
      getNextWord();
  }, []);  // Initial word when the component mounts

  return (
      <div>
          <h1 className="heading">Word Scramble Game</h1>
          {gameOver ? (
              <div>
                  <p className="message wrong">{message}</p>
                  <button onClick={restartGame} className="restart-button">Restart</button>
              </div>
          ) : (
              <div>
                  <div className="status">
                      <p className="strike-box">Strikes: {strikes}</p>
                      <p className="score-box">Score: {score}</p>
                  </div>
                  <p className="message">{message}</p>
                  <div className="word-box">{currentWord}</div>
                  <form onSubmit={checkAnswer}>
                      <input type="text" value={input} onChange={e => setInput(e.target.value)} className="input-box" />
                  </form>
                  <button onClick={passWord} className="pass-button">Pass ({passes} left)</button>
              </div>
          )}
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ScrambleGame />);
