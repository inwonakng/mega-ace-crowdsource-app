import algosdk from "algosdk";

const config = {
  token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  server: 'http://localhost:4001',
  port: 4001,

};



export const algodClient = new algosdk.Algodv2(
  config.token,
  config.server,
  config.port,
);

// this is where we will store the info to reach the published dapp
export const dappConfig = { 
  appId: 16,
  appAddress: 'EXS3TYR5UJFMF2IIKBUFUTRMI7GNHALVRA7WATV2ONN4ROSOD6QDWWA7DM',
}

// export const indexerClient = new algosdk.Indexer(

// )