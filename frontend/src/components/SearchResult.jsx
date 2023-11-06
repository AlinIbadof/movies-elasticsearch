const SearchResult = ({ results }) => {
  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result._source.title}</li>
      ))}
    </ul>
  );
};

export default SearchResult;
