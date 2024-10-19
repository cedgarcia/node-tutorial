const express = require('express');
const { getReserves, getAccountNativeAndWithIdAssets, setApiInstance } = require('./swap.controller');
const { validateReservesRequest, validateAssetsRequest } = require('./swap.validation');

const router = express.Router();

router.post('/swap', async (req, res) => {
  const validation = validateReservesRequest(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { amount } = req.body;
  try {
    const reserves = await getReserves(amount);
    res.json({ reserves });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reserves' });
  }
});

router.post('/assets', async (req, res) => {
  const validation = validateAssetsRequest(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { accountId } = req.body;
  try {
    const assets = await getAccountNativeAndWithIdAssets(accountId);
    res.json({ assets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// Exporting the router and function to set API instance
module.exports = {
  router,
  setApiInstance,
};
