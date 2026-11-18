// These flags come from the current admin listing, never from a cached Woo payload.
export const applyCatalogPublication = (product, listing) => {
  const metadata = listing?.metadata || {};
  const publication = metadata.wooPricePublication;
  const proposal = metadata.cjPriceProposal;
  const blocked = listing?.active === false || metadata.wooFrozen === true;

  return {
    ...product,
    admin_catalog: {
      blocked,
      approved: !blocked && listing?.active === true
        && publication?.state === 'woo_verified'
        && Boolean(proposal?.savedAt)
        && publication.proposalSavedAt === proposal.savedAt,
    },
  };
};
