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
    id: "0xa91f1a1b4a58901c46c06ebed6753ac0fc5ca24c4a2d6c88370d62956f2e6dd7"
  ) {
    blockNumber
    swaps {
      amountUSD
      amount0In
      amount0Out
      amount1In
      amount1Out
      from
      timestamp
      to
      transaction
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