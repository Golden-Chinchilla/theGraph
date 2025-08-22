
import axios from "axios";

const url = "https://gateway.thegraph.com/api/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum"; // 改成你的 API 地址
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
axios.post(url,
    {
        query: QUERY
    },
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 22362c71bf218f4347679f71612be8dc`,
        },

        proxy: { host: "127.0.0.1", port: 7890, protocol: "http" }, // 👈 Clash HTTP 端口
    })
    .then(res => console.log(JSON.stringify(res.data.data, null, 2)))

