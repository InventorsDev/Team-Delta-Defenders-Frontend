import React, { useState } from 'react';
import { ProductData } from './ProductCard';

interface MobileEditProductProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (product: ProductData) => void;
  onDelete?: (productId: number) => void;
}

const MobileEditProduct: React.FC<MobileEditProductProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!product || !isOpen) return null;

  // Get images array, fallback to single image if needed
  const productImages = (product as any)?.images || [(product as any)?.image || product.image];

  // State for form fields
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description || 'Fresh, juicy red tomatoes harvested at peak ripeness. Perfect for soups, stews, and sauces. Grown locally without harmful chemicals.',
    location: product.location,
    category: 'Vegetables'
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Legumes',
    'Herbs',
    'Spices',
    'Dairy',
    'Poultry',
    'Livestock'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updatedProduct: ProductData = {
      ...product,
      title: formData.title,
      price: formData.price,
      description: formData.description,
      location: formData.location
    };
    onSave?.(updatedProduct);
  };

  const handleDelete = () => {
    onDelete?.(product.id);
  };

  const handleImageEdit = (imageIndex: number) => {
    console.log('Edit image at index:', imageIndex);
    // TODO: Implement image edit functionality (delete or replace)
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-auto">
      {/* Header */}
      <div className="w-full h-20 px-5 py-4 bg-white/80 shadow-lg flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img
            src="/chevron-left-2.svg"
            alt="Back"
            className="w-6 h-6"
          />
        </button>
        <div className="text-xl font-madani-bold text-brand-colors-RootBlack">
          Edit Product
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-4 pb-24">
        <div className="flex flex-col gap-6">
        {/* Upload Image Section */}
        <div className="flex flex-col gap-5">
          <div className="text-base font-madani-medium text-brand-colors-RootBlack">
            Upload Image:
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {productImages.slice(0, 5).map((image: string, index: number) => (
              <div key={index} className="relative">
                <img
                  className="w-full aspect-square rounded-lg object-cover"
                  src={image}
                  alt={`Product ${index + 1}`}
                />
                <button
                  onClick={() => handleImageEdit(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-white shadow-lg rounded-full flex items-center justify-center border-none cursor-pointer hover:shadow-xl transition-shadow z-10"
                >
                  <img
                    src="/edit icon.svg"
                    alt="Edit"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Produce Name */}
        <div className="flex flex-col gap-3">
          <div className="text-base font-madani-medium text-brand-colors-RootBlack px-2">
            Produce Name:
          </div>
          <div className="h-12 px-6 py-3 bg-black/5 rounded-full border-2 border-black/5 flex items-center">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="flex-1 border-none outline-none bg-transparent text-brand-colors-RootBlack text-base font-madani-regular"
              placeholder="Enter produce name"
            />
          </div>
        </div>

        {/* Choose Category */}
        <div data-property-1="selected" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex', position: 'relative'}}>
          <div style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Choose category:</div>
          </div>
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            style={{
              alignSelf: 'stretch',
              height: 48,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: 'rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              borderRadius: 30,
              outline: '2px rgba(0, 0, 0, 0.05) solid',
              outlineOffset: '-2px',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'inline-flex',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Regular', fontWeight: '400', wordWrap: 'break-word'}}>{formData.category}</div>
            <div data-property-1="down" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 12, height: 6, left: 6, top: 9, position: 'absolute', outline: '2px var(--brand-colors-RootBlack, #182605) solid', outlineOffset: '-1px'}} />
              </div>
            </div>
          </button>

          {/* Category Dropdown */}
          {showCategoryDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--brand-colors-SteamWhite, white)',
              borderRadius: 20,
              boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              zIndex: 1000,
              marginTop: 4
            }}>
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => {
                    handleInputChange('category', category);
                    setShowCategoryDropdown(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    background: formData.category === category ? 'var(--brand-colors-HarvestMist, #E4FDE1)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    textBoxTrim: 'trim-both',
                    textBoxEdge: 'cap alphabetic',
                    color: 'var(--brand-colors-RootBlack, #182605)',
                    fontSize: 16,
                    fontFamily: 'MadaniArabic-Regular',
                    fontWeight: '400',
                    borderBottom: index < categories.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (formData.category !== category) {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.category !== category) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price per unit */}
        <div data-property-1="clicked" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
          <div style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Price per unit:</div>
          </div>
          <div style={{alignSelf: 'stretch', height: 48, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 30, outline: '2px rgba(0, 0, 0, 0.05) solid', outlineOffset: '-2px', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                textBoxTrim: 'trim-both',
                textBoxEdge: 'cap alphabetic',
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Regular',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}
            />
          </div>
        </div>

        {/* Produce Description */}
        <div data-property-1="clicked" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
          <div style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Produce Description:</div>
          </div>
          <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 30, outline: '2px rgba(0, 0, 0, 0.05) solid', outlineOffset: '-2px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', minHeight: 100}}>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                resize: 'none',
                textBoxTrim: 'trim-both',
                textBoxEdge: 'cap alphabetic',
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Regular',
                fontWeight: '400',
                wordWrap: 'break-word',
                lineHeight: '1.4',
                padding: 0
              }}
              rows={3}
            />
          </div>
        </div>

        {/* Select address */}
        <div data-property-1="default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
          <div style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Select address:</div>
          </div>
          <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16, position: 'relative', background: 'rgba(0, 0, 0, 0.05)', borderRadius: 30, outline: '2px rgba(0, 0, 0, 0.05) solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
              <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <img
                  src="/location-icon.svg"
                  alt="Location"
                  style={{
                    width: 24,
                    height: 24
                  }}
                />
              </div>
              <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>{product.location}</div>
            </div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Farm Address:</div>
              <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Plot 15, Igbogbo Road, {product.location}, Nigeria</div>
            </div>
            <div data-property-1="down" style={{right: 24, top: 16, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 12, height: 6, left: 6, top: 9, position: 'absolute', outline: '2px var(--brand-colors-RootBlack, #182605) solid', outlineOffset: '-1px'}} />
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Action Buttons */}
        <div className="fixed bottom-4 left-4 right-4 bg-white/20 rounded-full p-2 flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors"
            style={{ background: '#84C62C' }}
          >
            <div className="text-white text-base font-madani-bold">
              Save
            </div>
          </button>
          <button
            onClick={handleDelete}
            className="p-3 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <img
              src="/delete icon.svg"
              alt="Delete"
              className="w-6 h-6"
              style={{
                filter: 'invert(23%) sepia(89%) saturate(7495%) hue-rotate(4deg) brightness(101%) contrast(107%)'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileEditProduct;