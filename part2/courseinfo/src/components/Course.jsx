const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.exercises;
  }, 0);

  return <strong>total of {total} exercises</strong>;
};

const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
