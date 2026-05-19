import { useState } from "react";

const randomInt = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1));
  return result;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const TotalVotes = ({ total }) => <p>has {total} votes</p>;

const Content = ({ header, content, votes }) => {
  return (
    <div>
      <h2>{header}</h2>
      <p>{content}</p>
      <TotalVotes total={votes} />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const size = anecdotes.length - 1;

  // ----------------------------
  // USE STATE
  // ----------------------------
  // Create Array inizialt value [0,0,...]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(randomInt(0, size));
  const [maxVotes, setMaxVotes] = useState({ index: 0, votes: -1 });

  // ----------------------------
  // HANDLE
  // ----------------------------
  const handleNext = () => {
    const result = randomInt(0, size);
    //console.log("result, randomInt:", result);
    setSelected(result);
  };

  const handleVote = () => {
    const newVote = [...votes];
    newVote[selected] += 1;
    setVotes(newVote);

    if (newVote[selected] > maxVotes.votes) {
      setMaxVotes({ index: selected, votes: newVote[selected] });
    }
  };

  return (
    <div>
      <Content
        header="Anecdote of the day"
        content={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      {maxVotes.votes !== -1 ? (
        <Content
          header="Anecdote with most votes"
          content={anecdotes[maxVotes.index]}
          votes={votes[maxVotes.index]}
        />
      ) : null}
    </div>
  );
};

export default App;
