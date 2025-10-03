import { StatsCardData } from '@/components/dashboard/StatsCard';

export const mobileStatsCards: StatsCardData[] = [
  {
    id: 'mobile-overview',
    title: 'Dashboard Overview',
    type: 'overview',
    theme: 'dark',
    stats: [
      { value: 24, label: 'Products' },
      { value: 97, label: 'Orders' }
    ]
  },
  {
    id: 'mobile-add-product',
    title: 'Add New Product',
    type: 'action',
    theme: 'light',
    backgroundImage: '/dashboard-card-image.webp',
    description: 'Expand your marketplace presence by listing fresh produce that buyers are looking for.',
    actionButton: {
      text: 'Add Product',
      onClick: () => console.log('Add Product clicked'),
      variant: 'primary'
    }
  },
  {
    id: 'mobile-tip',
    title: 'Tip of the Day',
    type: 'tip',
    theme: 'hero',
    backgroundImage: '/dashboard-tip-bg.webp',
    backgroundOverlay: 'rgba(24, 38, 5, 0.7)',
    description: 'Post high-quality photos of your produce to attract more buyers and increase your sales by up to 40%.'
  }
];

// Desktop stats cards with proper action handlers
export const createDesktopStatsCards = (
  setActiveView: (view: 'dashboard' | 'listings' | 'chats' | 'settings') => void,
  setShouldTriggerAddListing: (value: boolean) => void
): StatsCardData[] => [
  {
    id: 'desktop-overview',
    title: 'Overview',
    type: 'overview',
    theme: 'dark',
    stats: [
      { value: 5, label: 'Chats' },
      { value: 10, label: 'Listing' }
    ]
  },
  {
    id: 'desktop-add-product',
    title: 'Ready to sell more',
    type: 'action',
    theme: 'light',
    backgroundImage: '/stats-card-2.webp',
    description: 'Add your fresh produce and start reaching buyers today.',
    actionButton: {
      text: 'Add New Product',
      onClick: () => {
        setActiveView('listings');
        setShouldTriggerAddListing(true);
      },
      variant: 'primary'
    }
  },
  {
    id: 'desktop-tip',
    title: 'Today\'s Tip',
    type: 'tip',
    theme: 'hero',
    backgroundImage: '/stats-card-3.webp',
    backgroundOverlay: 'hsla(86, 78%, 8%, 0.7)',
    description: 'Harvest early in the morning to keep your produce fresher for longer, cooler temps reduce wilting and spoilage!'
  }
];

export const desktopStatsCards: StatsCardData[] = [
  {
    id: 'desktop-overview',
    title: 'Overview',
    type: 'overview',
    theme: 'dark',
    stats: [
      { value: 5, label: 'Chats' },
      { value: 10, label: 'Listing' }
    ]
  },
  {
    id: 'desktop-add-product',
    title: 'Ready to sell more',
    type: 'action',
    theme: 'light',
    backgroundImage: '/stats-card-2.webp',
    description: 'Add your fresh produce and start reaching buyers today.',
    actionButton: {
      text: 'Add New Product',
      onClick: () => console.log('Add Product clicked'),
      variant: 'primary'
    }
  },
  {
    id: 'desktop-tip',
    title: 'Today\'s Tip',
    type: 'tip',
    theme: 'hero',
    backgroundImage: '/stats-card-3.webp',
    backgroundOverlay: 'hsla(86, 78%, 8%, 0.7)',
    description: 'Harvest early in the morning to keep your produce fresher for longer, cooler temps reduce wilting and spoilage!'
  }
];