import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Package, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  DollarSign
} from 'lucide-react';
import EditListingModal from './EditListingModal';
import ViewListingModal from './ViewListingModal';

interface Listing {
  id: number;
  produceType: string;
  quantity: string;
  harvestDate: string;
  price: string;
  status: string;
  image?: string;
  description?: string;
  createdAt?: string;
}

interface MyListingsProps {
  listings: Listing[];
  onDeleteListing: (id: number) => void;
  onEditListing: (id: number, updatedListing: any) => void;
  onCreateListing: () => void;
}

const MyListings: React.FC<MyListingsProps> = ({
  listings,
  onDeleteListing,
  onEditListing,
  onCreateListing
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [viewingListing, setViewingListing] = useState<Listing | null>(null);

  // Filter listings based on search and status
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.produceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (listing: Listing) => {
    if (window.confirm(`Are you sure you want to delete the ${listing.produceType} listing?`)) {
      onDeleteListing(listing.id);
    }
  };

  const handleEditSave = (updatedData: any) => {
    if (editingListing) {
      onEditListing(editingListing.id, updatedData);
      setEditingListing(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeListings = listings.filter(l => l.status === 'Active').length;
  const soldListings = listings.filter(l => l.status === 'Sold').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
            My Listings
          </h1>
          <p className="mt-2 text-lg text-gray-600" style={{ fontFamily: 'MadaniArabic-Medium' }}>
            Manage your produce listings and track their performance
          </p>
        </div>
        <Button 
          onClick={onCreateListing}
          className="bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 text-white px-6 py-3 text-lg"
          style={{ fontFamily: 'MadaniArabic-Bold' }}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Listing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.length}</div>
            <p className="text-xs text-muted-foreground">
              All your produce listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeListings}</div>
            <p className="text-xs text-muted-foreground">
              Available for buyers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sold Items</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{soldListings}</div>
            <p className="text-xs text-muted-foreground">
              Successfully sold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search listings by produce type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="expired">Expired</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matching listings found' : 'No listings yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first listing to start selling your produce'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button 
                onClick={onCreateListing}
                className="bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Listing
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={listing.produceType}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <Badge 
                  className={`absolute top-3 right-3 ${getStatusColor(listing.status)}`}
                >
                  {listing.status}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-brand-colors-RootBlack">
                    {listing.produceType}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Quantity:</strong> {listing.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Harvest Date:</strong> {new Date(listing.harvestDate).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-semibold text-brand-colors-SproutGreen">
                    {listing.price}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingListing(listing)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {listing.status === 'Active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingListing(listing)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(listing)}
                    className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Listing Modal */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          isOpen={!!editingListing}
          onClose={() => setEditingListing(null)}
          onSave={handleEditSave}
        />
      )}

      {/* View Listing Modal */}
      {viewingListing && (
        <ViewListingModal
          listing={viewingListing}
          isOpen={!!viewingListing}
          onClose={() => setViewingListing(null)}
        />
      )}
    </div>
  );
};

export default MyListings;