// CategoryHeader Component - Decorative header section with background image
// This component creates a visually appealing header section with a background image,
// gradient overlays, optional logo display, and decorative bottom elements.
//
// PURPOSE:
// Provides a decorative header section that appears at the top of certain pages.
// Creates visual separation and branding with a hero background image and gradient overlays.
// Used as a backdrop for TopNavBar component to create a layered visual effect.
//
// USAGE LOCATIONS:
// - src/components/Pages/CategoryPage.jsx (recipe category pages)
//    * Used with showLogo={false} to avoid duplicate logo (TopNavBar already has logo)
// - src/components/Pages/SearchPage.jsx (search results page)
//    * Used with default showLogo={true} to display logo
//
// PROPS:
//   - showLogo: Boolean (default: true)
//     * If true, displays the website logo on the left side that links to home page
//     * If false, hides the logo (useful when TopNavBar already displays logo)
//
// HOW IT WORKS:
// 1. Creates a fixed-height container (110px) with background image (/img/main-hero.webp)
// 2. Applies multiple gradient overlays for visual depth:
//    - Dark gradient from top (black/80) to transparent
//    - Light gradient from bottom (beige #F6EFE9) to transparent
// 3. Conditionally displays logo on left side based on showLogo prop
// 4. Shows optional navigation/search icons on right side (currently placeholder)
// 5. Adds decorative bottom gradient effect that blends with page content
// 6. Includes subtle decorative line at the bottom
//
// FEATURES:
//   - Fixed height header (110px) for consistent layout
//   - Background image with parallax-ready CSS (transform-gpu, willChange)
//   - Multiple gradient overlays for visual depth
//   - Optional logo display (can be hidden to avoid duplicates)
//   - Smooth hover animations on logo
//   - Bottom gradient effect that blends into page content
//   - Responsive design with max-width container
//
// VISUAL DESIGN:
//   - Background: Hero image (/img/main-hero.webp) positioned at center 25%
//   - Overlays: Dark-to-transparent (top) and beige-to-transparent (bottom)
//   - Logo: Optional, links to home page, has hover scale and rotate effects
//   - Bottom transition: Beige gradient that blends with page background
//   - Decorative line: Subtle gradient line at the bottom
//
// TECHNICAL DETAILS:
//   - Uses absolute positioning for background layers
//   - Gradient overlays use opacity and blend modes
//   - Logo hover effects use Framer Motion-style CSS transitions
//   - Background uses GPU acceleration (transform-gpu, willChange)
//   - Container uses z-index layering (background z-0, content z-10)
//
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryHeader = ({ showLogo = true }) => {
  return (
    <div className="relative h-[110px] overflow-hidden">
      {/* Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full transform-gpu transition-transform duration-[2s] ease-out"
        style={{
          backgroundImage: 'url(/img/main-hero.webp)',
          backgroundPosition: 'center 25%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform'
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6EFE9] via-[#F6EFE9]/50 to-transparent opacity-90"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 h-full">
        <div className="flex items-center justify-between h-full py-2">
          {/* Logo Section (optional to avoid duplicate with TopNavBar) */}
          {showLogo && (
            <Link 
              to="/"
              className="transform transition-all duration-300 hover:scale-105 hover:-rotate-2 relative group"
            >
              <div className="absolute inset-0 bg-black/20 rounded-full blur-xl scale-90 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"></div>
              <img 
                src="/img/logo.png" 
                alt="Autyzm od kuchni" 
                className="h-14 w-auto object-contain relative z-10"
              />
            </Link>
          )}

          {/* Navigation icons on the right - optional */}
          <div className="flex items-center gap-6 hidden">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300">
              <Link to="/search" className="text-gray-100/90 hover:text-white">
                {/* You can add icons here if needed */}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient effect */}
      <div 
        className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#F6EFE9] to-transparent"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"></div>
    </div>
  );
};

export default CategoryHeader;