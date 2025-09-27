import { useState, useCallback } from 'react';
import { mockOldListings } from '@/data/mockLegacyListings';

interface Listing {
  id: number;
  produceType: string;
  quantity: string;
  harvestDate: string;
  price: string;
  status: string;
  image: string;
}

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>(mockOldListings);

  const deleteListing = useCallback((id: number) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
  }, []);

  const editListing = useCallback((id: number, updatedListing: Partial<Listing>) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, ...updatedListing } : listing
      )
    );
  }, []);

  const addListing = useCallback((newListing: Omit<Listing, 'id'>) => {
    const id = Math.max(...listings.map(l => l.id), 0) + 1;
    setListings(prev => [...prev, { ...newListing, id }]);
  }, [listings]);

  const activeListings = listings.filter(listing => listing.status === 'Active');
  const soldListings = listings.filter(listing => listing.status === 'Sold');

  return {
    listings,
    activeListings,
    soldListings,
    deleteListing,
    editListing,
    addListing
  };
};