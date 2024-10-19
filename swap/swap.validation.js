const validateReservesRequest = (body) => {
    if (!body.amount) {
      return { valid: false, error: 'Missing amount parameter' };
    }
    return { valid: true };
  };
  
  const validateAssetsRequest = (body) => {
    if (!body.accountId) {
      return { valid: false, error: 'Missing accountId parameter' };
    }
    return { valid: true };
  };
  
  // Exporting the validation functions
  module.exports = {
    validateReservesRequest,
    validateAssetsRequest,
  };
  