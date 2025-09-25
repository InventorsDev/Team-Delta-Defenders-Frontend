import React from 'react';

export interface StatsCardData {
  id: string | number;
  title: string;
  type: 'overview' | 'action' | 'tip' | 'info';
  theme: 'dark' | 'light' | 'hero';
  backgroundImage?: string;
  backgroundOverlay?: string;
  subtitle?: string;
  description?: string;
  stats?: Array<{
    value: string | number;
    label: string;
  }>;
  actionButton?: {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  decorativeElements?: Array<{
    type: 'circle' | 'image';
    src?: string;
    position: string;
    opacity?: number;
  }>;
}

interface StatsCardProps {
  card: StatsCardData;
  variant?: 'mobile' | 'desktop';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  card,
  variant = 'mobile',
  className = ''
}) => {
  const isMobile = variant === 'mobile';

  // Base container classes
  const baseClasses = `relative overflow-hidden shadow-lg ${className}`;

  // Theme-based styling
  const getThemeClasses = () => {
    switch (card.theme) {
      case 'dark':
        return 'bg-brand-colors-RootBlack text-white';
      case 'light':
        return 'bg-white text-brand-colors-RootBlack';
      case 'hero':
        return 'bg-white text-white';
      default:
        return 'bg-brand-colors-SteamWhite text-brand-colors-RootBlack';
    }
  };

  // Mobile Overview Card
  if (isMobile && card.type === 'overview') {
    return (
      <div className={`w-full h-40 mb-6 rounded-2xl ${baseClasses} ${getThemeClasses()}`}>
        {/* Decorative circles */}
        <div className="absolute w-64 h-64 -left-28 top-16 opacity-10 bg-white rounded-full" />
        <div className="absolute w-64 h-64 right-14 -top-40 opacity-10 bg-white rounded-full" />

        {/* Title */}
        <div
          className="absolute left-6 top-6 text-xl font-bold"
          style={{ fontFamily: 'MadaniArabic-Bold' }}
        >
          {card.title}
        </div>

        {/* Stats */}
        <div className="absolute left-6 right-6 top-16 flex justify-center gap-8">
          {card.stats?.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div
                className="text-3xl font-bold"
                style={{ fontFamily: 'MadaniArabic-Bold' }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-medium"
                style={{ fontFamily: 'MadaniArabic-Medium' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile Action Card
  if (isMobile && card.type === 'action') {
    return (
      <div style={{width: '100%', height: '160px', position: 'relative', background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20}}>
        <div style={{left: 20, top: 20, position: 'absolute', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>{card.title}</div>
        <div style={{width: 130, height: 100, right: 8, top: 25, position: 'absolute'}}>
          <div style={{width: 110, height: 16, left: 10, top: 82, position: 'absolute', background: 'radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)', borderRadius: 9999}} />
          <img style={{width: 100, height: 100, left: 15, top: 0, position: 'absolute', objectFit: 'cover'}} src={card.backgroundImage || "https://placehold.co/103x100"} alt={card.title} />
        </div>
        {card.description && (
          <div style={{width: 204, left: 20, top: 47, position: 'absolute', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>{card.description}</div>
        )}
        {card.actionButton && (
          <div
            data-property-1="Default"
            style={{minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, left: 14, top: 102, position: 'absolute', background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', cursor: 'pointer'}}
            onClick={card.actionButton.onClick}
          >
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-SteamWhite, white)', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>{card.actionButton.text}</div>
          </div>
        )}
      </div>
    );
  }

  // Mobile Tip/Hero Card
  if (isMobile && card.type === 'tip') {
    return (
      <div className={`w-full h-40 mb-8 rounded-2xl ${baseClasses} ${getThemeClasses()}`}>
        {/* Background Image with Overlay */}
        {card.backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${card.backgroundImage})`,
              backgroundColor: card.backgroundOverlay || 'rgba(24, 38, 5, 0.7)',
              backgroundBlendMode: 'overlay'
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 gap-4">
          <div
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'MadaniArabic-Bold' }}
          >
            {card.title}
          </div>
          {card.description && (
            <div
              className="text-sm font-medium text-white leading-tight"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {card.description}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop Overview Card
  if (!isMobile && card.type === 'overview') {
    return (
      <div className={`w-64 h-60 absolute rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] ${baseClasses} ${getThemeClasses()}`}>
        {/* Decorative circles */}
        <div className="w-64 h-64 left-[-146px] top-[142px] absolute opacity-10 bg-brand-colors-SteamWhite rounded-full"></div>
        <div className="w-64 h-64 left-[134px] top-[-159px] absolute opacity-10 bg-brand-colors-SteamWhite rounded-full"></div>

        {/* Title */}
        <div
          className="left-[30px] top-[30px] absolute text-xl font-normal"
          style={{ fontFamily: 'MadaniArabic-Bold' }}
        >
          {card.title}
        </div>

        {/* Stats */}
        <div className="w-48 left-[30px] top-[88px] absolute inline-flex justify-between items-start">
          {card.stats?.map((stat, index) => (
            <div key={index} className="inline-flex flex-col justify-start items-center gap-3">
              <div
                className="text-4xl font-normal leading-[60px]"
                style={{ fontFamily: 'MadaniArabic-Bold' }}
              >
                {stat.value}
              </div>
              <div
                className="text-base font-normal"
                style={{ fontFamily: 'MadaniArabic-Medium' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Action Card
  if (!isMobile && card.type === 'action') {
    return (
      <div className={`w-full max-w-[420px] h-60 absolute rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] ${baseClasses} ${getThemeClasses()}`}>
        {/* Title */}
        <div
          className="left-[30px] top-[30px] absolute text-xl font-normal"
          style={{ fontFamily: 'MadaniArabic-Bold' }}
        >
          {card.title}
        </div>

        {/* Background Image */}
        {card.backgroundImage && (
          <div className="w-64 h-48 left-[164px] top-[34px] absolute">
            <div className="w-56 h-8 left-0 top-[162px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(0,_0,_0,_0.20)_0%,_rgba(0,_0,_0,_0)_100%)] rounded-full"></div>
            <img className="w-48 h-40 left-[58px] top-0 absolute" src={card.backgroundImage} alt={card.title} />
          </div>
        )}

        {/* Description */}
        {card.description && (
          <div
            className="w-48 left-[30px] top-[67px] absolute text-base font-madani-medium"
          >
            {card.description}
          </div>
        )}

        {/* Action Button */}
        {card.actionButton && (
          <button
            onClick={card.actionButton.onClick}
            className="w-48 h-14 min-w-48 px-6 py-3 left-[14px] top-[153px] absolute bg-brand-colors-SproutGreen rounded-[30px] inline-flex justify-center items-center gap-2.5 hover:bg-opacity-90 transition-colors cursor-pointer"
          >
            <div
              className="text-brand-colors-SteamWhite text-base font-normal"
              style={{ fontFamily: 'MadaniArabic-Bold' }}
            >
              {card.actionButton.text}
            </div>
          </button>
        )}
      </div>
    );
  }

  // Desktop Tip/Hero Card
  if (!isMobile && card.type === 'tip') {
    return (
      <div className={`w-80 h-60 absolute rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] ${baseClasses} ${getThemeClasses()}`}>
        {/* Background Image */}
        {card.backgroundImage && (
          <>
            <img className="w-80 h-60 left-[-1px] top-0 absolute object-cover" src={card.backgroundImage} alt={`${card.title} Background`} />
            <div
              className="w-80 h-60 left-[-1px] top-0 absolute"
              style={{ backgroundColor: card.backgroundOverlay || 'hsla(86, 78%, 8%, 0.7)' }}
            ></div>
          </>
        )}

        {/* Title */}
        <div
          className="left-[30px] top-[30px] absolute text-xl font-normal text-brand-colors-SteamWhite"
          style={{ fontFamily: 'MadaniArabic-Bold' }}
        >
          {card.title}
        </div>

        {/* Description */}
        {card.description && (
          <div
            className="w-72 left-[30px] top-[67px] absolute text-base font-normal text-brand-colors-SteamWhite"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            {card.description}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default StatsCard;