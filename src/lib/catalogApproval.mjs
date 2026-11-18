// Keep the database filter identical to the current green row in the admin.
// Applying it before LIMIT/OFFSET also keeps search and pagination accurate.
export const approvedListingSql = `
  admin_listing.active = TRUE
  AND admin_product.status <> 'archived'
  AND COALESCE(admin_listing.metadata->>'wooFrozen', 'false') <> 'true'
  AND admin_listing.metadata->'wooPricePublication'->>'state' = 'woo_verified'
  AND NULLIF(admin_listing.metadata->'cjPriceProposal'->>'savedAt', '') IS NOT NULL
  AND admin_listing.metadata->'wooPricePublication'->>'proposalSavedAt'
    = admin_listing.metadata->'cjPriceProposal'->>'savedAt'
`;
