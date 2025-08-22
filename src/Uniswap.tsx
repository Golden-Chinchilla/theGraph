import { cacheExchange, createClient, fetchExchange, Provider, useQuery } from 'urql';
const apiKey = import.meta.env.VITE_THEGRAPH_API_KEY;

console.log('key(raw)=', import.meta.env.VITE_THEGRAPH_API_KEY);
console.log('key(len)=', String(import.meta.env.VITE_THEGRAPH_API_KEY ?? '').length);

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
  uniswapFactories(first: 5) {
    id
    pairCount
    totalVolumeUSD
    totalVolumeETH
  }
  tokens(first: 5) {
    id
    symbol
    name
    decimals
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