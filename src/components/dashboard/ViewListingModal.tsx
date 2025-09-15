import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, DollarSign, FileText, Clock } from 'lucide-react';

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

interface ViewListingModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

const ViewListingModal: React.FC<ViewListingModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sold':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-colors-RootBlack">
            Listing Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.produceType}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge className={`${getStatusColor(listing.status)} border`}>
                {listing.status}
              </Badge>
            </div>
          </div>

          {/* Title and Basic Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-brand-colors-RootBlack mb-2">
                {listing.produceType}
              </h2>
              <p className="text-lg text-gray-600">
                Fresh {listing.produceType.toLowerCase()} ready for harvest
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="h-5 w-5 text-brand-colors-SproutGreen" />
                  <h3 className="font-semibold text-gray-900">Quantity Available</h3>
                </div>
                <p className="text-2xl font-bold text-brand-colors-SproutGreen">
                  {listing.quantity}
                </p>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-brand-colors-SproutGreen" />
                  <h3 className="font-semibold text-gray-900">Asking Price</h3>
                </div>
                <p className="text-2xl font-bold text-brand-colors-SproutGreen">
                  {listing.price}
                </p>
              </div>

              {/* Harvest Date */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-brand-colors-SproutGreen" />
                  <h3 className="font-semibold text-gray-900">Harvest Date</h3>
                </div>
                <p className="text-lg font-medium text-gray-700">
                  {formatDate(listing.harvestDate)}
                </p>
                <p className="text-sm text-gray-500">
                  Expected availability date
                </p>
              </div>

              {/* Created Date */}
              {listing.createdAt && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-brand-colors-SproutGreen" />
                    <h3 className="font-semibold text-gray-900">Listed On</h3>
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    {formatDate(listing.createdAt)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date listing was created
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {listing.description && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-brand-colors-SproutGreen" />
                  <h3 className="font-semibold text-gray-900">Description</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>
            )}

            {/* Status Information */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Listing Status</h3>
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(listing.status)} border text-sm px-3 py-1`}>
                  {listing.status}
                </Badge>
                <span className="text-gray-600">
                  {listing.status === 'Active' && 'This listing is visible to buyers and ready for inquiries.'}
                  {listing.status === 'Sold' && 'This produce has been sold and is no longer available.'}
                  {listing.status === 'Draft' && 'This listing is saved as draft and not visible to buyers.'}
                  {listing.status === 'Expired' && 'This listing has expired and needs to be renewed.'}
                </span>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">For Buyers</h4>
              <p className="text-blue-800 text-sm">
                Interested buyers can contact you directly through our messaging system. 
                Make sure to keep your contact information up to date in your profile settings.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={onClose}
              className="bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 px-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewListingModal;