window.onerror = function(message, source, lineno, colno, error) {
  console.error(`Global error: ${message} at ${source || 'N/A'}:${lineno}:${colno} at ${new Date().toISOString()}`, error);
  if (message === "Script error.") {
    const failed = window.failedScripts ? window.failedScripts.join(', ') : 'Unknown';
    document.getElementById("error-message").textContent = `Failed to load scripts: ${failed}. Check network, disable ad blockers, try incognito mode, or retry.`;
    document.getElementById("error-details").textContent = `Source: ${source || 'N/A'}\nLine: ${lineno}\nColumn: ${colno}\nError: ${error?.stack || 'No stack trace'}\nFailed Scripts: ${failed}\nTimestamp: ${new Date().toISOString()}`;
    document.getElementById("root").innerHTML = "";
    document.querySelector(".fallback-ui").style.display = "block";
  }
};

console.log("Checking for CDN script availability at " + new Date().toISOString() + "...");
function checkScripts(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const check = () => {
      if (window.React && window.ReactDOM && window.Babel && window.PropTypes && window.challenges) {
        console.log("All critical scripts loaded successfully at " + new Date().toISOString());
        resolve();
      } else {
        console.warn("Scripts not loaded at " + new Date().toISOString() + ":", {
          React: !!window.React,
          ReactDOM: !!window.ReactDOM,
          Babel: !!window.Babel,
          PropTypes: !!window.PropTypes,
          Challenges: !!window.challenges
        });
      }
    };
    check();
    const interval = setInterval(check, 500);
    setTimeout(() => {
      clearInterval(interval);
      if (!window.React || !window.ReactDOM || !window.Babel || !window.PropTypes || !window.challenges) {
        console.error("Script loading timed out at " + new Date().toISOString());
        reject(new Error("Failed to load required scripts"));
      }
    }, timeout);
  });
}

checkScripts().catch(() => {
  console.warn("Primary CDN (esm.sh) failed at " + new Date().toISOString() + ", attempting fallback to unpkg.com...");
  const scripts = [
    "https://unpkg.com/react@18.2.0/umd/react.production.min.js",
    "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone@7.24.7/babel.min.js",
    "https://unpkg.com/prop-types@15.8.1/prop-types.min.js",
    "./challenges.js"
  ];
  scripts.forEach(src => {
    const script = document.createElement("script");
    script.src = src;
    script.crossOrigin = src.startsWith("http") ? "anonymous" : null;
    script.async = false;
    script.onload = () => console.log(`Fallback script loaded: ${src} at ${new Date().toISOString()}`);
    script.onerror = () => {
      console.error(`Failed to load fallback script: ${src} at ${new Date().toISOString()}`);
      window.failedScripts = window.failedScripts || [];
      window.failedScripts.push(src.split('/').pop().replace(/@.+$/, ''));
      document.getElementById("error-message").textContent = `Failed to load fallback script: ${src.split('/').pop().replace(/@.+$/, '')}. Check network or retry.`;
      document.getElementById("error-details").textContent += `\nFailed Fallback: ${src} at ${new Date().toISOString()}`;
      document.querySelector(".fallback-ui").style.display = "block";
    };
    document.head.appendChild(script);
  });
});

console.log("Initializing React application at " + new Date().toISOString() + "...");

function showError(message, details = "") {
  console.error(message, details, "at " + new Date().toISOString());
  const errorMessage = document.getElementById("error-message");
  const errorDetails = document.getElementById("error-details");
  if (errorMessage) errorMessage.textContent = message;
  if (errorDetails) errorDetails.textContent = details;
  document.getElementById("root").innerHTML = "";
  document.querySelector(".fallback-ui").style.display = "block";
}

if (!window.React || !window.ReactDOM || !window.Babel || !window.PropTypes || !window.challenges) {
  const failed = window.failedScripts ? window.failedScripts.join(', ') : 'Unknown';
  showError(`Failed to load required libraries: ${failed}. Check network, disable ad blockers, or try incognito mode.`, `Failed Scripts: ${failed}\nTimestamp: ${new Date().toISOString()}`);
  throw new Error("Library load failure at " + new Date().toISOString());
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught at " + new Date().toISOString() + ":", error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary details at " + new Date().toISOString() + ":", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fallback-ui" style={{ display: 'block' }}>
          <h1>Error: Application Failed to Render</h1>
          <p>{this.state.error?.message || "Failed to load application. Check console for details."}</p>
          <pre>{this.state.errorInfo?.componentStack || "No stack trace available."}</pre>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log("App component initializing at " + new Date().toISOString() + "...");
  const [currentChallenge, setCurrentChallenge] = React.useState(null);
  const [selectedFlags, setSelectedFlags] = React.useState([]);
  const [currentFeedback, setCurrentFeedback] = React.useState('');
  const [isHintModalOpen, setIsHintModalOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');

  const handleFlagSelection = (flag) => {
    console.log("Selecting flag:", flag, "at " + new Date().toISOString());
    setSelectedFlags((prevFlags) => {
      const updatedFlags = [...prevFlags, flag];
      if (currentChallenge?.redFlags?.every((f) => updatedFlags.includes(f))) {
        setCurrentFeedback("Correct! All red flags detected.");
      } else {
        setCurrentFeedback("Keep going! Find all red flags.");
      }
      return updatedFlags;
    });
  };

  const selectChallenge = (challenge) => {
    console.log("Selecting challenge:", challenge.id, "at " + new Date().toISOString());
    setCurrentChallenge(challenge);
    setSelectedFlags([]);
    setCurrentFeedback('');
    setIsHintModalOpen(false);
  };

  const goHome = () => {
    console.log("Returning to home at " + new Date().toISOString());
    setCurrentChallenge(null);
    setSelectedFlags([]);
    setCurrentFeedback('');
    setIsHintModalOpen(false);
  };

  const loadNextChallenge = () => {
    console.log("Loading next challenge at " + new Date().toISOString());
    setSelectedFlags([]);
    setCurrentFeedback('');
    setIsHintModalOpen(false);
    const currentIndex = challenges.findIndex((ch) => ch.id === currentChallenge?.id);
    const nextIndex = (currentIndex + 1) % challenges.length;
    setCurrentChallenge(challenges[nextIndex]);
  };

  const openHintModal = () => {
    console.log("Opening hint modal at " + new Date().toISOString());
    setIsHintModalOpen(true);
  };

  const closeHintModal = () => {
    console.log("Closing hint modal at " + new Date().toISOString());
    setIsHintModalOpen(false);
  };

  const handleSearch = (event) => {
    console.log("Search query:", event.target.value, "at " + new Date().toISOString());
    setSearchInput(event.target.value.toLowerCase());
  };

  const filteredChallenges = searchInput
    ? challenges.filter(
        (challenge) =>
          challenge.sender.toLowerCase().includes(searchInput) ||
          challenge.subject.toLowerCase().includes(searchInput)
      )
    : challenges;

  console.log("Rendering App component at " + new Date().toISOString());
  return (
    <div className="app">
      <div className="sidebar">
        <h1 className="sidebar-title">PhishGuard</h1>
        <span className="sidebar-subtitle">Detect & Shield</span>
        <div className="sidebar-actions">
          <button className="btn-home" onClick={goHome}>Home</button>
        </div>
        <ul className="sidebar-menu">
          {challenges.map((challenge) => (
            <li
              key={challenge.id}
              className={`menu-item ${currentChallenge?.id === challenge.id ? 'active' : ''}`}
              onClick={() => selectChallenge(challenge)}
            >
              {challenge.level}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by sender or subject..."
            className="search-input"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        {!currentChallenge ? (
          <div className="inbox">
            <h2 className="inbox-title">Inbox</h2>
            <ul className="inbox-list">
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                  <li
                    key={challenge.id}
                    className="list-item"
                    onClick={() => selectChallenge(challenge)}
                  >
                    <div className="item-content">
                      <input type="checkbox" className="checkbox" disabled />
                      <span className="sender">{challenge.sender}</span>
                      <span className={`subject ${challenge.type === 'sms' ? 'sms' : ''}`}>
                        {challenge.type === 'sms' ? (
                          <>
                            <span className="sms-badge">SMS</span>
                            {challenge.subject}
                          </>
                        ) : (
                          challenge.subject
                        )}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="no-results">No emails or SMS found.</p>
              )}
            </ul>
          </div>
        ) : (
          <div className="challenge-view">
            {currentChallenge.type === 'sms' ? (
              <div className="sms-container">
                <div className="sms-header">
                  <h3 className="sms-sender">{currentChallenge.sender}</h3>
                </div>
                <div className="sms-messages">
                  <div className="timestamp">{currentChallenge.date}</div>
                  <div className="message">
                    <div dangerouslySetInnerHTML={{ __html: currentChallenge.body }} />
                  </div>
                </div>
                <div className="sms-actions">
                  <button className="btn-hint" onClick={openHintModal}>
                    Hint
                  </button>
                </div>
              </div>
            ) : (
              <div className="email-container">
                <div className="email-header">
                  <h3 className="email-title">{currentChallenge.subject}</h3>
                  <div className="sender-info">
                    <span className="tooltip sender" data-tooltip={currentChallenge.realSender}>
                      {currentChallenge.sender}
                    </span>
                    <span className="real-sender">&lt;{currentChallenge.realSender}&gt;</span>
                  </div>
                  <p className="metadata">
                    <span>to {currentChallenge.to}</span>
                    <span className="date">{currentChallenge.date}</span>
                  </p>
                </div>
                <div className="email-actions">
                  <button>Reply</button>
                  <button>Reply All</button>
                  <button>Forward</button>
                  <button className="btn-hint" onClick={openHintModal}>
                    Hint
                  </button>
                </div>
                <div className="email-content">
                  <div dangerouslySetInnerHTML={{ __html: currentChallenge.body }} />
                </div>
                <div className="email-footer">
                  <div className="reply">
                    <p>Click here to reply or forward</p>
                  </div>
                </div>
              </div>
            )}
            <div className="red-flags">
              <h3 className="flags-title">Select Red Flags</h3>
              <ul className="flags-list">
                {currentChallenge?.redFlags?.map((flag, index) => (
                  <li key={index}>
                    <button
                      className={`flag ${selectedFlags.includes(flag) ? 'selected' : ''}`}
                      onClick={() => handleFlagSelection(flag)}
                      disabled={selectedFlags.includes(flag)}
                    >
                      {flag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {currentFeedback && <p className="feedback">{currentFeedback}</p>}
            <button className="btn-next" onClick={loadNextChallenge}>
              Next Challenge
            </button>
          </div>
        )}
        {isHintModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">Hints</h3>
              <ul className="modal-list">
                {currentChallenge?.hints?.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
              <button className="modal-close" onClick={closeHintModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

console.log("Attempting to parse JSX at " + new Date().toISOString() + "...");
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    showError("Root element not found at " + new Date().toISOString(), "Failed to find root element");
    console.error("Root element not found at " + new Date().toISOString());
    throw new Error("Failed to find root element at " + new Date().toISOString());
  }
  console.log("Babel parsing JSX at " + new Date().toISOString() + "...");
  const root = ReactDOM.createRoot(rootElement);
  console.log("Rendering root element at " + new Date().toISOString() + "...");
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log("Application successfully rendered at " + new Date().toISOString());
} catch (error) {
  showError("Failed to render application at " + new Date().toISOString(), error.stack || error.toString());
  console.error("Render error at " + new Date().toISOString(), error);
  throw error;
}
