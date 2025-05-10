import React, { useEffect, useState } from 'react';
import { useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './Header';
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

const GET_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      languages {
        code
        name
      }
    }
  }
`;

const CountryCard = ({ country }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transform transition duration-300 hover:scale-105">
      <div className="px-6 py-4">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-2">{country.emoji}</span>
          <h2 className="text-xl font-bold text-gray-800">{country.name}</h2>
        </div>
        <div className="text-gray-600 mb-4">
          <p><span className="font-semibold">Code:</span> {country.code}</p>
          <p><span className="font-semibold">Capital:</span> {country.capital || 'N/A'}</p>
          <p><span className="font-semibold">Currency:</span> {country.currency || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {country.languages.map((language) => (
              <span
                key={language.code}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
              >
                {language.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
function DisplayCountries({ searchTerm }) {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCountries.map((country) => (
        <CountryCard key={country.code} country={country} />
      ))}
    </div>
  );
}
export default function Travel() {
  const [searchData, setSearchData] = useState('');

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <>
      <Header />
      <ApolloProvider client={client}>
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Countries Explorer
          </h2>
          <div className="mx-auto max-w-[600px]">
            <input
              type="text"
              name="searchData"
              value={searchData}
              onChange={handleChange}
              placeholder="Search By Country Name"
              className="w-full p-2 border border-[#309898] rounded"
            />
          </div>
          <br />
          <DisplayCountries searchTerm={searchData} />
        </div>
      </ApolloProvider>
    </>
  );
}
