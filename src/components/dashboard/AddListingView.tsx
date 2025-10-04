import React, { useRef, useState, useEffect } from 'react';
import { productsService, CreateProductRequest } from '@/services/productsService';
import { api } from '@/services/api';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  unit: string;
  location: string;
  image: string;
  category: string;
  farmAddress: string;
  averageMarketPrice: string;
  images: string[];
}

interface AddListingViewProps {
  onSave: () => void;
  onCancel: () => void;
}

const AddListingView: React.FC<AddListingViewProps> = ({
  onSave,
  onCancel
}) => {
  const [addFormData, setAddFormData] = useState<Partial<Listing>>({
    title: '',
    description: '',
    price: '',
    unit: 'Per Unit',
    location: '',
    category: '',
    farmAddress: '',
    images: []
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [addScrollPosition, setAddScrollPosition] = useState(0);
  const addScrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle scroll position for add view custom scrollbar
  const handleAddScroll = () => {
    if (addScrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = addScrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setAddScrollPosition(scrollPercentage);
    }
  };

  // Handle form input changes
  const handleAddFormChange = (field: keyof Listing, value: string) => {
    setAddFormData({ ...addFormData, [field]: value });
  };

  // Handle image upload
  const handleImageUpload = async (index: number, file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Upload image to backend
      const response = await api.upload<{ url: string }>('/upload/image', formData);

      if (response.success && response.data?.url) {
        const newImages = [...uploadedImages];
        newImages[index] = response.data.url;
        setUploadedImages(newImages);

        // Update form data
        setAddFormData({
          ...addFormData,
          images: newImages.filter(img => img) // Remove empty slots
        });
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle image selection
  const handleImageSelect = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // Handle file input change
  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(index, file);
    }
  };

  // Handle save new listing
  const handleSaveNewListing = async () => {
    // Validate required fields
    if (!addFormData.title || !addFormData.category || !addFormData.price || !addFormData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);

    try {
      const productData: CreateProductRequest = {
        name: addFormData.title,
        description: addFormData.description,
        price: parseFloat(addFormData.price.replace(/[₦,]/g, '')),
        category: addFormData.category,
        quantity: 1, // Default quantity
        images: uploadedImages.filter(img => img) // Only include uploaded images
      };

      await productsService.createProduct(productData);

      alert('Product added successfully!');
      onSave();
    } catch (error) {
      console.error('Failed to save listing:', error);
      alert('Failed to save listing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative">
      <div 
        ref={addScrollContainerRef}
        onScroll={handleAddScroll}
        className="w-[474px] h-full left-[20px] top-[10px] absolute overflow-y-auto pr-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {/* Upload Images Section */}
        <div className="w-[474px] mb-5">
          <div className="h-56 flex flex-wrap gap-4 content-start">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="w-24 h-24 relative overflow-hidden">
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  onChange={(e) => handleFileChange(index, e)}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => handleImageSelect(index)}
                  disabled={isUploading}
                  className="w-24 h-24 rounded-[10px] object-cover cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                  {uploadedImages[index] ? (
                    <img className="w-24 h-24 rounded-[10px] object-cover" src={uploadedImages[index]} alt={`Upload ${index + 1}`} />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-[10px] flex items-center justify-center">
                      <span className="text-gray-400 text-xs">+</span>
                    </div>
                  )}
                </button>
                {uploadedImages[index] && (
                  <div className="w-6 h-6 absolute top-[5px] right-[5px] bg-brand-colors-SteamWhite rounded-full shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex justify-center items-center">
                    <img src="/edit icon.svg" alt="Edit" className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {isUploading && (
            <p className="text-sm text-brand-colors-SproutGreen mt-2">Uploading image...</p>
          )}
        </div>

        {/* Produce Name */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Produce Name:</div>
          <input
            type="text"
            value={addFormData?.title || ''}
            onChange={(e) => handleAddFormChange('title', e.target.value)}
            className="h-12 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular']"
          />
        </div>

        {/* Choose Category */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Choose category:</div>
          <div className="relative">
            <select
              value={addFormData?.category || ''}
              onChange={(e) => handleAddFormChange('category', e.target.value)}
              className="w-full h-12 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular'] appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Tubers">Tubers</option>
              <option value="Legumes">Legumes</option>
              <option value="Spices">Spices</option>
              <option value="Leafy Greens">Leafy Greens</option>
            </select>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img 
                src="/chevron-down-2.svg" 
                alt="Dropdown" 
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Price per unit */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Price per unit:</div>
          <input
            type="text"
            value={addFormData?.price || ''}
            onChange={(e) => handleAddFormChange('price', e.target.value)}
            className="h-12 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular']"
          />
        </div>

        {/* Produce Description */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Produce Description:</div>
          <textarea
            value={addFormData?.description || ''}
            onChange={(e) => handleAddFormChange('description', e.target.value)}
            className="h-20 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular'] resize-none"
          />
        </div>

        {/* Select Address */}
        <div className="w-[474px] mb-20 flex flex-col gap-5">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Select address:</div>
          <div className="px-6 py-4 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 flex flex-col gap-5 relative">
            <div className="flex items-center gap-1">
              <img className="w-6 h-6" src="/location-icon.svg" alt="Location" />
              <input
                type="text"
                value={addFormData?.location || ''}
                onChange={(e) => handleAddFormChange('location', e.target.value)}
                className="flex-1 bg-transparent text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium'] outline-none"
              />
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Farm Address:</div>
              <input
                type="text"
                value={addFormData?.farmAddress || ''}
                onChange={(e) => handleAddFormChange('farmAddress', e.target.value)}
                className="bg-transparent text-brand-colors-rootgrey text-base font-['MadaniArabic-Medium'] outline-none"
              />
            </div>
            <div className="absolute right-[16px] top-[16px]">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-3 h-1.5 absolute left-[6px] top-[9px] outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center px-5">
        <div className="bg-white/20 rounded-full p-2.5 flex items-center gap-1.5">
          <button
            onClick={handleSaveNewListing}
            disabled={isSaving || isUploading}
            className="w-48 min-w-40 min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="text-brand-colors-SteamWhite text-base font-['MadaniArabic-Bold']">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </button>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="p-2.5 bg-brand-colors-SteamWhite rounded-3xl shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-red-50 transition-colors group disabled:opacity-50"
          >
            <img
              src="/delete icon.svg"
              alt="Delete"
              className="w-5 h-5 group-hover:opacity-80"
              style={{ filter: 'invert(23%) sepia(89%) saturate(7495%) hue-rotate(4deg) brightness(101%) contrast(107%)' }}
            />
          </button>
        </div>
      </div>

      {/* Custom Scroll Indicator */}
      <div className="w-[5px] h-[500px] right-[10px] top-[100px] absolute bg-gray-200 rounded-full z-10">
        <div 
          className="w-[5px] h-14 bg-brand-colors-SproutGreen rounded-full transition-all duration-150"
          style={{
            transform: `translateY(${addScrollPosition * (500 - 56)}px)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default AddListingView;