import React, { useRef, useState, useEffect } from 'react';

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

interface EditListingViewProps {
  listing: Listing;
  onSave: () => void;
  onCancel: () => void;
}

const EditListingView: React.FC<EditListingViewProps> = ({
  listing,
  onSave,
  onCancel
}) => {
  const [editFormData, setEditFormData] = useState<Listing | null>(null);
  const [editScrollPosition, setEditScrollPosition] = useState(0);
  const editScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listing) {
      setEditFormData({ ...listing });
    }
  }, [listing]);

  // Handle scroll position for edit view custom scrollbar
  const handleEditScroll = () => {
    if (editScrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = editScrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setEditScrollPosition(scrollPercentage);
    }
  };

  // Handle form input changes
  const handleFormChange = (field: keyof Listing, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically save to backend
    console.log('Saving changes:', editFormData);
    onSave();
  };

  if (!editFormData) return null;

  return (
    <div className="flex-1 overflow-hidden relative">
      <div 
        ref={editScrollContainerRef}
        onScroll={handleEditScroll}
        className="w-[474px] h-full left-[20px] top-[10px] absolute overflow-y-auto pr-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        {/* Upload Images Section */}
        <div className="w-[474px] mb-5">
          <div className="h-56 flex flex-wrap gap-4 content-start">
            {editFormData.images.slice(0, 5).map((img, index) => (
              <div key={index} className="w-24 h-24 relative overflow-hidden">
                <img className="w-24 h-24 rounded-[10px] object-cover" src={img} alt={`Upload ${index + 1}`} />
                <div className="w-6 h-6 absolute top-[5px] right-[5px] bg-brand-colors-SteamWhite rounded-full shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex justify-center items-center">
                  <img src="/edit icon.svg" alt="Edit" className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produce Name */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Produce Name:</div>
          <input
            type="text"
            value={editFormData?.title || ''}
            onChange={(e) => handleFormChange('title', e.target.value)}
            className="h-12 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular']"
          />
        </div>

        {/* Choose Category */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Choose category:</div>
          <div className="relative">
            <select
              value={editFormData?.category || ''}
              onChange={(e) => handleFormChange('category', e.target.value)}
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
            value={editFormData?.price || ''}
            onChange={(e) => handleFormChange('price', e.target.value)}
            className="h-12 px-6 py-3 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Regular']"
          />
        </div>

        {/* Produce Description */}
        <div className="w-[474px] mb-5 flex flex-col gap-3">
          <div className="px-2.5 text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Produce Description:</div>
          <textarea
            value={editFormData?.description || ''}
            onChange={(e) => handleFormChange('description', e.target.value)}
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
                value={editFormData?.location || ''}
                onChange={(e) => handleFormChange('location', e.target.value)}
                className="flex-1 bg-transparent text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium'] outline-none"
              />
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Farm Address:</div>
              <input
                type="text"
                value={editFormData?.farmAddress || ''}
                onChange={(e) => handleFormChange('farmAddress', e.target.value)}
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
            onClick={handleSaveChanges}
            className="w-48 min-w-40 min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center">
            <span className="text-brand-colors-SteamWhite text-base font-['MadaniArabic-Bold']">Save</span>
          </button>
          <button 
            onClick={onCancel}
            className="p-2.5 bg-brand-colors-SteamWhite rounded-3xl shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-red-50 transition-colors group"
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
            transform: `translateY(${editScrollPosition * (500 - 56)}px)`
          }}
        ></div>
      </div>
    </div>
  );
};

export default EditListingView;