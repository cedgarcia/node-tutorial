const { ApiPromise, WsProvider } = require('@polkadot/api');
const { u8aToHex } = require('@polkadot/util');
const Decimal = require('decimal.js');

let apiInstance;

// Format function for decimals
const formatDecimalsFromToken = (base, decimals) => {
  return new Decimal(base || 0).dividedBy(Math.pow(10, parseFloat(decimals || '0'))).toFixed();
}; 

// Function to get reserves
const getReserves = async (amountValue) => {
  const multiLocation = apiInstance.createType('FrameSupportTokensFungibleUnionOfNativeOrWithId', { "Native": null }).toU8a();
  const multiLocation2 = apiInstance.createType('FrameSupportTokensFungibleUnionOfNativeOrWithId', { "WithId": 1 }).toU8a();
  const amount = apiInstance.createType('u128', amountValue).toU8a();
  const bool = apiInstance.createType('bool', true).toU8a();

  const encodedInput = new Uint8Array(multiLocation.length + multiLocation2.length + amount.length + bool.length);
  encodedInput.set(multiLocation, 0);
  encodedInput.set(multiLocation2, multiLocation.length);
  encodedInput.set(amount, multiLocation.length + multiLocation2.length);
  encodedInput.set(bool, multiLocation.length + multiLocation2.length + amount.length);

  const encodedInputHex = u8aToHex(encodedInput);

  // Call the RPC method
  const response = await apiInstance.rpc.state.call('AssetConversionApi_quote_price_exact_tokens_for_tokens', encodedInputHex);
  const decodedPrice = apiInstance.createType('Option<u128>', response);
  return decodedPrice.toHuman();
};

// Function to get account native and with ID assets
const getAccountNativeAndWithIdAssets = async (accountId) => {
  // Placeholder implementation
  return { nativeAssets: 1000, assetsWithId: 2000 }; // Replace this with your actual logic
};

// Set the API instance
const setApiInstance = (api) => {
  apiInstance = api;
};

module.exports = {
  getReserves,
  getAccountNativeAndWithIdAssets,
  setApiInstance,
};
