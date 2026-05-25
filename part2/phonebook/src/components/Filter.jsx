const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <form>
        <div>
          filter shown with
          <input value={filter} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
