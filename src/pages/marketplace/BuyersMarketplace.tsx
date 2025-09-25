import React from 'react';
import '@/styles/fonts.css';

// Components
import Footer from '../../components/marketplace/Footer';
import ProductDetailView from '../../components/marketplace/ProductDetailView';
import Chats from '../../components/dashboard/Chats';
import Settings from '../../components/dashboard/Settings';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import HeroSection from '../../components/marketplace/HeroSection';
import CategorySidebar from '../../components/marketplace/CategorySidebar';
import FilterSidebar from '../../components/marketplace/FilterSidebar';
import ProductGrid from '../../components/marketplace/ProductGrid';

// Data
import { marketplaceProducts, Product } from '@/data/marketplaceProducts';
import { marketplaceCategories } from '@/data/marketplaceCategories';

// Hooks
import { useProductSearch } from '@/hooks/useProductSearch';
import { useScrollDetection } from '@/hooks/useScrollDetection';  

type ActiveView = 'marketplace' | 'chats' | 'settings';

const BuyersMarketplace = () => {
  // UI State
  const [activeView, setActiveView] = React.useState<ActiveView>('marketplace');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = React.useState(false);

  // Custom hooks
  const isScrolled = useScrollDetection();
  const {
    searchTerm,
    isSearchActive,
    selectedCategories,
    selectedLocation,
    minPrice,
    maxPrice,
    handleSearch,
    handleCategoryToggle,
    clearAllFilters,
    getDisplayProducts,
    setSelectedLocation,
    setMinPrice,
    setMaxPrice
  } = useProductSearch(marketplaceProducts);

  // Event handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedProduct(null);
  };

  // Computed values
  const displayProducts = getDisplayProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <MarketplaceHeader
        isScrolled={isScrolled}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Marketplace View */}
      {activeView === 'marketplace' && (
        <>
          {/* Hero Section */}
          <HeroSection
            isSearchActive={isSearchActive}
            isScrolled={isScrolled}
            searchTerm={searchTerm}
            onSearch={handleSearch}
          />
      
          {/* Main Content */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories Sidebar / Filter Sidebar */}
              <div className="w-full lg:w-80 xl:w-96">
                {!isSearchActive ? (
                  <CategorySidebar categories={marketplaceCategories} />
                ) : (
                  <FilterSidebar
                    categories={marketplaceCategories}
                    selectedCategories={selectedCategories}
                    selectedLocation={selectedLocation}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onCategoryToggle={handleCategoryToggle}
                    onLocationChange={setSelectedLocation}
                    onMinPriceChange={setMinPrice}
                    onMaxPriceChange={setMaxPrice}
                    onClearAll={clearAllFilters}
                  />
                )}
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={displayProducts}
                isSearchActive={isSearchActive}
                searchTerm={searchTerm}
                onProductClick={handleProductClick}
              />
        </div>
      </div>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Chats View */}
      {activeView === 'chats' && (
        <div className="flex-1 bg-white overflow-hidden">
          <Chats showHeader={false} />
        </div>
      )}

      {/* Settings View */}
      {activeView === 'settings' && (
        <div className="flex-1 bg-white overflow-y-auto h-full">
          <Settings
            context="marketplace"
            headerTitle="Manage Your Account"
            headerSubtitle="Buyer Settings"
            showHeader={false}
            showBusinessName={false}
            placeholders={{
              fullName: "Enter your full name",
              phoneNumber: "Enter your phone number",
              email: "Enter your email address"
            }}
          />
        </div>
      )}

      {/* Product Detail View */}
      {activeView === 'marketplace' && (
        <ProductDetailView
          product={selectedProduct}
          isOpen={isDetailViewOpen}
          onClose={handleCloseDetailView}
        />
      )}
    </div>
  );
};

export default BuyersMarketplace;