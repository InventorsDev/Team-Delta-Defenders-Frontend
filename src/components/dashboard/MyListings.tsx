import React, { useState, useEffect, useRef } from 'react';
import DeleteListingModal from './DeleteListingModal';
import EditListingView from './EditListingView';
import AddListingView from './AddListingView';

interface MyListingsProps {
  onDeleteListing: (id: number) => void;
  onCreateListing: () => void;
  shouldTriggerAdd?: boolean;
  onAddTriggered?: () => void;
}

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

const listingsData: Listing[] = [
  {
    id: 1,
    title: "Basket of Tomatoes",
    description: "Fresh, juicy red tomatoes harvested at peak ripeness. Perfect for soups, stews, and sauces. Grown locally without harmful chemicals.",
    price: "₦35,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-1.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦36,000",
    images: ["/listing-1.png", "/listing-2.png", "/listing-3.png", "/listing-4.png", "/listing-5.png"]
  },
  {
    id: 2,
    title: "Basket of Fresh Pepper (Atarodo)",
    description: "Hot and flavorful peppers to spice up your meals. Carefully handpicked and sorted for freshness.",
    price: "₦50,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-2.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦52,000",
    images: ["/listing-2.png", "/listing-3.png", "/listing-4.png", "/listing-5.png", "/listing-6.png"]
  },
  {
    id: 3,
    title: "Sack of Onions (50kg)",
    description: "Firm, aromatic onions ideal for everyday cooking. Long shelf life when stored in a cool, dry place.",
    price: "₦50,500",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-3.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦51,000",
    images: ["/listing-3.png", "/listing-4.png", "/listing-5.png", "/listing-6.png", "/listing-7.png"]
  },
  {
    id: 4,
    title: "Sack of Sweet Potatoes (50kg)",
    description: "Sweet, creamy, and packed with nutrients. Great for roasting, frying, or boiling. Direct from farm to your kitchen.",
    price: "₦20,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-4.png",
    category: "Tubers",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦21,000",
    images: ["/listing-4.png", "/listing-5.png", "/listing-6.png", "/listing-7.png", "/listing-8.png"]
  },
  {
    id: 5,
    title: "Basket of Garden Eggs",
    description: "Fresh green and white garden eggs, perfect for traditional Nigerian dishes and stews.",
    price: "₦30,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-5.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦31,000",
    images: ["/listing-5.png", "/listing-6.png", "/listing-7.png", "/listing-8.png", "/listing-9.png"]
  },
  {
    id: 6,
    title: "Bunch of Plantain (20–25 pieces)",
    description: "Ripe and semi-ripe plantains for frying, boiling, or roasting. Naturally sweet with a firm texture.",
    price: "₦35,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-6.png",
    category: "Fruits",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦36,000",
    images: ["/listing-6.png", "/listing-7.png", "/listing-8.png", "/listing-9.png", "/listing-10.png"]
  },
  {
    id: 7,
    title: "50kg Bag of Local Rice (Ofada)",
    description: "Stone-free, aromatic Ofada rice with a rich, earthy flavor. Perfect for local delicacies.",
    price: "₦55,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-7.png",
    category: "Grains",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦56,000",
    images: ["/listing-7.png", "/listing-8.png", "/listing-9.png", "/listing-10.png", "/listing-1.png"]
  },
  {
    id: 8,
    title: "Basket of Okra",
    description: "Fresh, tender okra pods great for soups and stews. Rich in fiber and vitamins.",
    price: "₦21,500",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-8.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦22,000",
    images: ["/listing-8.png", "/listing-9.png", "/listing-10.png", "/listing-1.png", "/listing-2.png"]
  },
  {
    id: 9,
    title: "Bag of Yellow Maize (50kg)",
    description: "Premium dried yellow maize suitable for pap, cornmeal, or animal feed.",
    price: "₦55,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-9.png",
    category: "Grains",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦56,000",
    images: ["/listing-9.png", "/listing-10.png", "/listing-1.png", "/listing-2.png", "/listing-3.png"]
  },
  {
    id: 10,
    title: "Basket of Cucumbers",
    description: "Crisp, refreshing cucumbers perfect for salads, smoothies, or snacking.",
    price: "₦35,000",
    unit: "Per Unit",
    location: "Ojo, Lagos",
    image: "/listing-10.png",
    category: "Vegetables",
    farmAddress: "Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria",
    averageMarketPrice: "₦36,000",
    images: ["/listing-10.png", "/listing-1.png", "/listing-2.png", "/listing-3.png", "/listing-4.png"]
  }
];

const MyListings: React.FC<MyListingsProps> = ({
  onDeleteListing,
  onCreateListing,
  shouldTriggerAdd,
  onAddTriggered
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Latest Listing");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [editScrollPosition, setEditScrollPosition] = useState(0);
  const [addScrollPosition, setAddScrollPosition] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editFormData, setEditFormData] = useState<Listing | null>(null);
  const [addFormData, setAddFormData] = useState<Listing | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const editScrollContainerRef = useRef<HTMLDivElement>(null);
  const addScrollContainerRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    "Latest Listing",
    "Oldest First", 
    "Price: Low to High",
    "Price: High to Low",
    "Alphabetical"
  ];

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle trigger add listing from FarmerDashboard
  useEffect(() => {
    if (shouldTriggerAdd && onAddTriggered) {
      handleAddNewListing();
      onAddTriggered();
    }
  }, [shouldTriggerAdd, onAddTriggered]);

  // Handle scroll position for custom scrollbar
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollPosition(scrollPercentage);
    }
  };

  // Handle scroll position for edit view custom scrollbar
  const handleEditScroll = () => {
    if (editScrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = editScrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setEditScrollPosition(scrollPercentage);
    }
  };

  // Handle scroll position for add view custom scrollbar
  const handleAddScroll = () => {
    if (addScrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = addScrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setAddScrollPosition(scrollPercentage);
    }
  };

  // Handle image navigation
  const handlePreviousImage = () => {
    if (selectedListing) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedListing.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedListing) {
      setCurrentImageIndex(prev => 
        prev === selectedListing.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Reset image index when selecting a new listing
  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentImageIndex(0);
    setIsEditMode(false);
    setIsAddMode(false);
    setEditFormData(null);
    setAddFormData(null);
  };

  // Handle edit button click
  const handleEditListing = () => {
    if (selectedListing) {
      setEditFormData({ ...selectedListing });
      setIsEditMode(true);
    }
  };

  // Handle form input changes
  const handleFormChange = (field: keyof Listing, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  // Handle add form input changes
  const handleAddFormChange = (field: keyof Listing, value: string) => {
    if (addFormData) {
      setAddFormData({ ...addFormData, [field]: value });
    }
  };

  // Handle add new listing button click
  const handleAddNewListing = () => {
    const newListingTemplate = {
      id: 0,
      title: '',
      description: '',
      price: '',
      unit: 'Per Unit',
      location: '',
      image: '',
      category: '',
      farmAddress: '',
      averageMarketPrice: '',
      images: []
    };
    setAddFormData(newListingTemplate);
    setIsAddMode(true);
    setSelectedListing(null);
    setIsEditMode(false);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Here you would typically save to backend
    console.log('Saving changes:', editFormData);
    setIsEditMode(false);
    if (editFormData) {
      setSelectedListing(editFormData);
    }
  };

  // Handle save new listing
  const handleSaveNewListing = () => {
    // Here you would typically save to backend
    console.log('Saving new listing:', addFormData);
    setIsAddMode(false);
    setAddFormData(null);
    // You could add the new listing to the listings data here
  };

  // Handle delete popup
  const handleDeleteClick = (listing: Listing, event: React.MouseEvent) => {
    event.stopPropagation();
    setListingToDelete(listing);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (listingToDelete) {
      onDeleteListing(listingToDelete.id);
      setShowDeletePopup(false);
      setListingToDelete(null);
      // Close detail view if deleting the currently selected listing
      if (selectedListing?.id === listingToDelete.id) {
        setSelectedListing(null);
        setIsEditMode(false);
        setEditFormData(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setListingToDelete(null);
  };

  return (
    <div className="w-[1129px] h-[980px] relative bg-brand-colors-SteamWhite rounded-[20px] overflow-hidden">
      {/* Listings Grid */}
      <div 
        className="h-[764px] px-2.5 pb-2.5 left-[30px] top-[226px] absolute flex justify-start items-start gap-2.5 overflow-y-auto"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
        }}
      >
        <div className={`${(selectedListing || isAddMode) ? 'w-[528px] grid grid-cols-2 gap-5' : 'w-[1048px] flex flex-wrap gap-5'} transition-all duration-300`}>
          {listingsData.map((listing) => (
            <div 
              key={listing.id} 
              onClick={() => handleSelectListing(listing)}
              className="w-60 h-80 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            {/* Image Container */}
            <div className="w-56 h-36 left-[10px] top-[10px] absolute rounded-[10px] overflow-hidden">
              <img className="w-full h-full object-cover rounded-[10px]" src={listing.image} alt={listing.title} />
            </div>
            
            {/* Title */}
            <div className="w-56 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-madani-medium">
              {listing.title}
            </div>
            
            {/* Description */}
            <div className="w-56 h-12 left-[10px] top-[237px] absolute justify-start text-brand-colors-RootBlack text-xs font-madani-light">
              {listing.description}
            </div>
            
            {/* Price */}
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-baseline gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-madani-medium leading-9">
                {listing.price}
              </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">
                {listing.unit}
              </div>
            </div>
            
            {/* Location */}
            <div className="left-[10px] top-[298px] absolute flex items-center gap-1">
              <img className="w-6 h-6" src="/location-icon.svg" alt="Location" />
              <div className="text-brand-colors-RootBlack text-xs font-madani-light">
                {listing.location}
              </div>
            </div>
            
              {/* Delete Icon */}
              <button 
                onClick={(e) => handleDeleteClick(listing, e)}
                className="p-2.5 left-[188px] top-[15px] absolute bg-brand-colors-SteamWhite rounded-3xl shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center hover:bg-red-50 transition-colors group"
              >
                <img 
                  src="/delete icon.svg" 
                  alt="Delete" 
                  className="w-5 h-5 group-hover:opacity-80"
                  style={{ filter: 'invert(36%) sepia(69%) saturate(2083%) hue-rotate(338deg) brightness(97%) contrast(106%)' }}
                />
              </button>
            </div>
          ))}
        </div>
        
        {/* Detail/Edit/Add View - Isolated Component */}
        {(selectedListing || isAddMode) && (
          <div className="sticky w-[514px] h-[724px] top-[20px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] z-30 flex flex-col overflow-hidden">
            {/* Header with Upload Image Text for Edit/Add Mode */}
            <div className="relative h-16 flex-shrink-0 flex items-center justify-between px-5">
              {(isEditMode || isAddMode) && (
                <div className="text-brand-colors-RootBlack text-base font-['MadaniArabic-Medium']">Upload Image:</div>
              )}
              {isAddMode && (
                <button 
                  onClick={() => {
                    setIsAddMode(false);
                    setAddFormData(null);
                  }}
                  className="p-2.5 bg-brand-colors-SteamWhite rounded-3xl shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <img 
                    src="/close icon.svg" 
                    alt="Close" 
                    className="w-5 h-5"
                  />
                </button>
              )}
            </div>

            {/* Conditional Content */}
            {!isEditMode && !isAddMode && selectedListing ? (
              /* Detail View */
              <>
              <div className="flex-1 px-5 overflow-hidden">
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="h-full overflow-y-auto pr-2"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none'
                  }}
                >
                  <div className="pb-8">
                  {/* Main Image with Navigation */}
                  <div className="relative mb-6">
                    <img className="w-full h-72 rounded-[10px] object-cover" src={selectedListing.images[currentImageIndex]} alt={selectedListing.title} />
                    
                    {/* Navigation Arrows and Close Button */}
                    <div className="absolute inset-0 flex justify-between items-center px-2.5 pointer-events-none">
                      <button 
                        onClick={handlePreviousImage}
                        className="w-12 h-12 bg-white/70 rounded-full flex justify-center items-center pointer-events-auto cursor-pointer hover:bg-white/90 transition-colors"
                      >
                        <img 
                          src="/chevron-left-2.svg" 
                          alt="Previous" 
                          className="w-4 h-4"
                        />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="w-12 h-12 bg-white/70 rounded-full flex justify-center items-center pointer-events-auto cursor-pointer hover:bg-white/90 transition-colors"
                      >
                        <img 
                          src="/chevron-right-2.svg" 
                          alt="Next" 
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                    
                    {/* Close Button */}
                    <button 
                      onClick={() => {
                        setSelectedListing(null);
                        setIsEditMode(false);
                        setIsAddMode(false);
                        setEditFormData(null);
                        setAddFormData(null);
                      }}
                      className="absolute top-2.5 right-2.5 w-10 h-10 bg-white/70 rounded-full flex justify-center items-center pointer-events-auto cursor-pointer hover:bg-white/90 transition-colors z-10"
                    >
                      <img 
                        src="/close icon.svg" 
                        alt="Close" 
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                  
                  {/* Thumbnail Images */}
                  <div className="flex justify-start items-center gap-5 mb-8">
                    {selectedListing.images.slice(0, 4).map((img, index) => (
                      <img 
                        key={index} 
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-24 h-24 rounded-[10px] object-cover cursor-pointer transition-all ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-brand-colors-SproutGreen ring-offset-2' 
                            : 'hover:opacity-80'
                        }`} 
                        src={img} 
                        alt={`${selectedListing.title} ${index + 1}`} 
                      />
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-3xl font-['MadaniArabic-Bold'] text-brand-colors-RootBlack leading-[50px] mb-4">
                    {selectedListing.title}
                  </h2>
                  
                  {/* Price */}
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-2xl font-['MadaniArabic-Bold'] text-brand-colors-RootBlack">
                      {selectedListing.price}
                    </span>
                    <span className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack">
                      {selectedListing.unit}
                    </span>
                  </div>
                  
                  {/* Average Market Price */}
                  <div className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] inline-flex items-center gap-2.5 mb-6">
                    <span className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack">
                      Average market price {selectedListing.averageMarketPrice}
                    </span>
                  </div>
                  
                  {/* Category */}
                  <div className="mb-6">
                    <h3 className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack mb-2">
                      Category:
                    </h3>
                    <p className="text-base font-['MadaniArabic-Medium'] text-brand-colors-rootgrey">
                      {selectedListing.category}
                    </p>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 mb-6">
                    <img className="w-6 h-6" src="/location-icon.svg" alt="Location" />
                    <span className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack">
                      {selectedListing.location}
                    </span>
                  </div>
                  
                  {/* Farm Address */}
                  <div className="mb-6">
                    <h3 className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack mb-2">
                      Farm Address:
                    </h3>
                    <p className="text-base font-['MadaniArabic-Medium'] text-brand-colors-rootgrey">
                      {selectedListing.farmAddress}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-4">
                    <h3 className="text-base font-['MadaniArabic-Medium'] text-brand-colors-RootBlack mb-2">
                      Description:
                    </h3>
                    <p className="text-base font-['MadaniArabic-Medium'] text-brand-colors-rootgrey">
                      {selectedListing.description}
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed Action Buttons at Bottom */}
              <div className="h-20 flex-shrink-0 flex items-center justify-center px-5">
                <div className="bg-white/20 rounded-full p-2.5 flex items-center gap-1.5">
                  <button 
                    onClick={handleEditListing}
                    className="px-6 py-3 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors min-w-[192px]">
                    <span className="text-base font-['MadaniArabic-Bold'] text-brand-colors-SteamWhite">
                      Edit
                    </span>
                  </button>
                  <button 
                    onClick={(e) => handleDeleteClick(selectedListing, e)}
                    className="p-2.5 bg-brand-colors-SteamWhite rounded-3xl shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-red-50 transition-colors group"
                  >
                    <img 
                      src="/delete icon.svg" 
                      alt="Delete" 
                      className="w-5 h-5 group-hover:opacity-80"
                      style={{ filter: 'invert(36%) sepia(69%) saturate(2083%) hue-rotate(338deg) brightness(97%) contrast(106%)' }}
                    />
                  </button>
                </div>
              </div>
              
              {/* Custom Scroll Indicator */}
              <div className="w-[5px] h-[500px] right-[10px] top-[100px] absolute bg-gray-200 rounded-full z-10">
                <div 
                  className="w-[5px] h-14 bg-brand-colors-SproutGreen rounded-full transition-all duration-150"
                  style={{
                    transform: `translateY(${scrollPosition * (500 - 56)}px)`
                  }}
                ></div>
              </div>
              </>
            ) : isEditMode && selectedListing ? (
              /* Edit View */
              <EditListingView 
                formData={editFormData}
                onFormChange={handleFormChange}
                onSave={handleSaveChanges}
                onCancel={() => {
                  setIsEditMode(false);
                  setEditFormData(null);
                }}
                scrollPosition={editScrollPosition}
                scrollContainerRef={editScrollContainerRef}
                onScroll={handleEditScroll}
              />
            ) : isAddMode ? (
              /* Add New Listing View */
              <AddListingView 
                formData={addFormData}
                onFormChange={handleAddFormChange}
                onSave={handleSaveNewListing}
                onCancel={() => {
                  setIsAddMode(false);
                  setAddFormData(null);
                }}
                scrollPosition={addScrollPosition}
                scrollContainerRef={addScrollContainerRef}
                onScroll={handleAddScroll}
              />
            ) : null}
          </div>
        )}
      </div>

      {/* Header Section */}
      <div className="w-[1129px] px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex flex-col justify-start items-start gap-10">
        <div className="w-[1049px] flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div className="text-brand-colors-RootBlack text-base font-madani-medium">
              manage all your produce
            </div>
            <div className="text-brand-colors-RootBlack text-2xl font-madani-bold">
              My Listings
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center hover:bg-gray-50 transition-colors">
              <img className="w-6 h-6" src="/design/assets/icons folder/notification icon.svg" alt="Notifications" />
            </button>
            <img className="w-10 h-10 rounded-full" src="/design/assets/dashboard & marketplace assets/profile image.png" alt="Profile" />
          </div>
        </div>
        
        {/* Controls Section */}
        <div className="w-[1052px] inline-flex justify-between items-center">
          {/* Search Bar */}
          <div className="w-96 p-3 bg-black/5 rounded-[30px] outline outline-1 outline-offset-[-1px] outline-black/5 flex items-center gap-2">
            <img className="w-6 h-6" src="/design/assets/icons folder/search icon.svg" alt="Search" />
            <div className="text-brand-colors-rootgrey text-xl font-madani-medium leading-9">
              Search
            </div>
          </div>
          
          <div className="flex justify-start items-center gap-5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3.5 relative">
              <div className="text-brand-colors-rootgrey text-xl font-madani-medium leading-9">
                Sort by :
              </div>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-52 px-6 py-3 bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-1 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-brand-colors-RootBlack text-base font-madani-medium leading-6 whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                    {selectedSort}
                  </div>
                  <img 
                    src="/chevron-down-2.svg" 
                    alt="Chevron" 
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-52 bg-brand-colors-SteamWhite rounded-[15px] shadow-[0px_8px_40px_10px_rgba(0,0,0,0.12)] overflow-hidden z-20">
                    {sortOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left text-base font-madani-medium hover:bg-brand-colors-HarvestMist transition-colors whitespace-nowrap ${
                          selectedSort === option 
                            ? 'bg-brand-colors-HarvestMist text-brand-colors-RootBlack' 
                            : 'text-brand-colors-rootgrey hover:text-brand-colors-RootBlack'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Add New Listing Button */}
            <button 
              onClick={handleAddNewListing}
              className="h-14 min-w-48 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center hover:bg-opacity-90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-madani-bold">
                Add New Listing
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Listing Modal */}
      <DeleteListingModal 
        isOpen={showDeletePopup}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        productName={selectedListing?.title}
      />
    </div>
  ); 
};

export default MyListings;