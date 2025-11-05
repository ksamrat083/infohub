import React, { useState } from "react";

function ConvertModule() {
  const [amount, setAmount] = useState("");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const convert = async () => {
    if (!amount) {
      setError("Enter an amount");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/convert?from=INR&to=${toCurrency}&amount=${amount}`);
      if (!res.ok) throw new Error("Failed to fetch conversion");
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setError("Unable to fetch conversion rate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        placeholder="Amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button onClick={convert}>Convert</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <p>
            {amount} INR = {result.result} {toCurrency}
          </p>
          <p>Rate: {result.rate}</p>
        </div>
      )}
    </div>
  );
}

export default ConvertModule;
