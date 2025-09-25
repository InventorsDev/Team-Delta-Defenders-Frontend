import React, { useState } from 'react';
import '@/styles/fonts.css';
import { marketplaceCategories } from '@/data/marketplaceCategories';

interface MobileAddListingProps {
  onBack?: () => void;
  onSave?: (formData: FormData) => void;
}

interface FormData {
  images: File[];
  produceName: string;
  category: string;
  pricePerUnit: string;
  description: string;
  address: string;
}

const MobileAddListing: React.FC<MobileAddListingProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    images: [],
    produceName: '',
    category: '',
    pricePerUnit: '',
    description: '',
    address: 'Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria'
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = file;
      setFormData({ ...formData, images: newImages });

      const reader = new FileReader();
      reader.onload = () => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = reader.result as string;
        setSelectedImages(newSelectedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setFormData({ ...formData, category: categoryName });
    setShowCategoryDropdown(false);
  };

  return (
    <div className="w-full h-screen relative bg-white overflow-hidden">
      {/* Header */}
      <div className="w-full px-5 py-5 bg-white bg-opacity-80 shadow-lg flex items-center gap-3 fixed top-0 z-10">
        <button onClick={onBack} className="flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-colors-RootBlack rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="text-xl font-bold text-brand-colors-RootBlack font-madani-bold">
          Add New Product
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 px-4 pb-32 overflow-y-auto h-full">
        <div className="flex flex-col gap-8">
          {/* Upload Images Section */}
          <div className="flex flex-col gap-5">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
              Upload Image:
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full aspect-square relative overflow-hidden rounded-lg border-2 border-dashed border-brand-colors-RootBlack">
                    {selectedImages[index] ? (
                      <img
                        src={selectedImages[index]}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gray-300 bg-opacity-20 rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative flex items-center justify-center">
                            <img src="/upload-image-icon.svg" alt="Upload Image" className="w-6 h-6" />
                            <img src="/lucide_plus.svg" alt="Add" className="w-3 h-3 absolute" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produce Name */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium px-2">
              Produce Name:
            </div>
            <input
              type="text"
              placeholder="Enter your produce name"
              value={formData.produceName}
              onChange={(e) => handleInputChange('produceName', e.target.value)}
              className="w-full h-12 px-6 py-3 bg-black bg-opacity-5 rounded-full border-2 border-black border-opacity-5 text-base font-normal text-brand-colors-RootBlack font-madani-regular placeholder-brand-colors-rootgrey flex items-center"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-3 relative">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium px-2">
              Category:
            </div>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full h-12 px-6 py-3 bg-black bg-opacity-5 rounded-full border-2 border-black border-opacity-5 flex items-center justify-between"
            >
              <span className={`text-base font-normal font-madani-regular ${formData.category ? 'text-brand-colors-RootBlack' : 'text-brand-colors-rootgrey'}`}>
                {formData.category || 'select category'}
              </span>
              <svg className="w-6 h-6 text-brand-colors-RootBlack" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                {marketplaceCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <img src={category.icon} alt={category.name} className="w-5 h-5" />
                    <span className="text-base font-normal text-brand-colors-RootBlack font-madani-regular">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price per unit */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium px-2">
              Price per unit:
            </div>
            <input
              type="text"
              placeholder="Enter price"
              value={formData.pricePerUnit}
              onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
              className="w-full h-12 px-6 py-3 bg-black bg-opacity-5 rounded-full border-2 border-black border-opacity-5 text-base font-normal text-brand-colors-RootBlack font-madani-regular placeholder-brand-colors-rootgrey flex items-center"
            />
          </div>

          {/* Produce Description */}
          <div className="flex flex-col gap-3">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium px-2">
              Produce Description:
            </div>
            <textarea
              placeholder="Enter your produce description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-6 py-3 bg-black bg-opacity-5 rounded-3xl border-2 border-black border-opacity-5 text-base font-normal text-brand-colors-RootBlack font-madani-regular placeholder-brand-colors-rootgrey resize-none flex items-start"
            />
          </div>

          {/* Select Address */}
          <div className="flex flex-col gap-5">
            <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium px-2">
              Select address:
            </div>
            <div className="w-full px-6 py-4 bg-black bg-opacity-5 rounded-3xl border-2 border-black border-opacity-5 flex flex-col gap-5 relative">
              <div className="flex items-center gap-1">
                <svg className="w-6 h-6 text-brand-colors-RootBlack" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
                  Ojo, Lagos
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
                  Farm Address:
                </div>
                <div className="text-base font-medium text-brand-colors-rootgrey font-madani-medium">
                  {formData.address}
                </div>
              </div>
              <button className="absolute top-4 right-4">
                <svg className="w-6 h-6 text-brand-colors-RootBlack" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-full h-full p-2.5 bg-white bg-opacity-20 rounded-full flex items-center gap-2">
          <div
            onClick={handleSave}
            data-property-1="Default"
            style={{
              width: '187px',
              minWidth: '160px',
              minHeight: '40px',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: '#84C62C',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                textBoxTrim: 'trim-both',
                textBoxEdge: 'cap alphabetic',
                color: 'white',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Bold',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}
            >
              save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAddListing;