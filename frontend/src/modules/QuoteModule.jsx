import React, { useState } from "react";

function QuoteModule() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const getQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/quote`);
      if (!res.ok) throw new Error("Failed to fetch quote");
      const json = await res.json();
      setQuote(json);
    } catch (err) {
      setError("Unable to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Motivational Quote</h2>
      <button onClick={getQuote}>Get Quote</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {quote && (
        <div>
          <p>"{quote.text}"</p>
          <p>— {quote.author}</p>
        </div>
      )}
    </div>
  );
}

export default QuoteModule;
