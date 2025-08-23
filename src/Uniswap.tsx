import { cacheExchange, createClient, fetchExchange, Provider, useQuery } from 'urql';
const apiKey = import.meta.env.VITE_THEGRAPH_API_KEY;

const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
  },
  exchanges: [cacheExchange, fetchExchange],
  preferGetMethod: false
});

const QUERY = `{
  transaction(
    id: "0x607a890e453c4f04e14e0122d1f93beabab5f36cc71346ba5c0b04220eee79a3"
  ) {
    swaps {
      amountUSD
      from
      timestamp
      to
      amount0In
      amount0Out
      amount1In
      amount1Out
    }
  }
}`;

const ExampleComponent = () => {
  const [result] = useQuery({ query: QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const WrappedExampleComponent = () => (
  <Provider value={client}>
    <ExampleComponent />
  </Provider>
);

export default WrappedExampleComponent;