const Language = ({ language }) => <li>{language}</li>;

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([key, value]) => (
        <Language key={key} language={value} />
      ))}
    </ul>
  );
};

export default Languages;
