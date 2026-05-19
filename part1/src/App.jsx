import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Buttons = ({ good, neutral, bad }) => {
  return (
    <>
      <Button onClick={good} text="good" />
      <Button onClick={neutral} text="neutral" />
      <Button onClick={bad} text="bad" />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total !== 0) {
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    // Create Table component ?
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positive}%`} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // asynchronous update problem ?
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  console.log("good:", good);
  console.log("neutral:", neutral);
  console.log("bad:", bad);
  return (
    <div>
      <h1>give feedback</h1>
      <Buttons
        good={handleGoodClick}
        neutral={handleNeutralClick}
        bad={handleBadClick}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
