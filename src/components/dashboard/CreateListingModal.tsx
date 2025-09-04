import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listing: any) => void;
}

interface ListingFormData {
  produceType: string;
  quantity: string;
  unit: string;
  harvestDate: string;
  price: string;
  priceUnit: string;
  description: string;
  image: File | null;
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<ListingFormData>({
    produceType: '',
    quantity: '',
    unit: 'bags',
    harvestDate: '',
    price: '',
    priceUnit: 'per bag',
    description: '',
    image: null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Predefined produce types as per FR003
  const produceTypes = [
    'Tomato',
    'Maize',
    'Yam',
    'Cassava',
    'Rice',
    'Plantain',
    'Cocoyam',
    'Sweet Potato',
    'Pepper',
    'Okra',
    'Cucumber',
    'Lettuce',
    'Carrot',
    'Onion',
    'Garlic'
  ];

  const units = [
    'bags',
    'kg',
    'tonnes',
    'pieces',
    'tubers',
    'bunches',
    'baskets',
    'crates'
  ];

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.produceType) {
      newErrors.produceType = 'Produce type is required';
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.harvestDate) {
      newErrors.harvestDate = 'Expected harvest date is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Format the data for submission
    const listingData = {
      produceType: formData.produceType,
      quantity: `${formData.quantity} ${formData.unit}`,
      harvestDate: formData.harvestDate,
      price: `₦${Number(formData.price).toLocaleString()} ${formData.priceUnit}`,
      description: formData.description,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
      createdAt: new Date().toISOString()
    };

    onSubmit(listingData);
    
    // Reset form
    setFormData({
      produceType: '',
      quantity: '',
      unit: 'bags',
      harvestDate: '',
      price: '',
      priceUnit: 'per bag',
      description: '',
      image: null
    });
    setImagePreview(null);
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-colors-RootBlack">
            Create New Listing
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Produce Type */}
          <div className="space-y-2">
            <Label htmlFor="produceType">Produce Type *</Label>
            <Select
              value={formData.produceType}
              onValueChange={(value) => handleInputChange('produceType', value)}
            >
              <SelectTrigger className={errors.produceType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select produce type" />
              </SelectTrigger>
              <SelectContent>
                {produceTypes.map((produce) => (
                  <SelectItem key={produce} value={produce}>
                    {produce}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.produceType && (
              <p className="text-sm text-red-500">{errors.produceType}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Enter quantity"
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => handleInputChange('unit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expected Harvest Date */}
          <div className="space-y-2">
            <Label htmlFor="harvestDate">Expected Harvest Date *</Label>
            <Input
              id="harvestDate"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => handleInputChange('harvestDate', e.target.value)}
              className={errors.harvestDate ? 'border-red-500' : ''}
            />
            {errors.harvestDate && (
              <p className="text-sm text-red-500">{errors.harvestDate}</p>
            )}
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Asking Price (₦) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceUnit">Price Unit</Label>
              <Select
                value={formData.priceUnit}
                onValueChange={(value) => handleInputChange('priceUnit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per bag">per bag</SelectItem>
                  <SelectItem value="per kg">per kg</SelectItem>
                  <SelectItem value="per tonne">per tonne</SelectItem>
                  <SelectItem value="per piece">per piece</SelectItem>
                  <SelectItem value="per tuber">per tuber</SelectItem>
                  <SelectItem value="per bunch">per bunch</SelectItem>
                  <SelectItem value="per basket">per basket</SelectItem>
                  <SelectItem value="per crate">per crate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Add any additional details about your produce..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Produce Image (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-brand-colors-SproutGreen hover:underline">
                        Click to upload an image
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90"
            >
              Create Listing
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingModal;