import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  author = "Autyzm od Kuchni",
  ogType = "website",
  ogImage = "/img/logo.png",
  canonical
}) => {
  // Default title and description if not provided
  const defaultTitle = "Autyzm od Kuchni - Dieta eliminacyjna bez glutenu, nabiału i cukru";
  const defaultDescription = "Odkryj jak dieta eliminacyjna bez glutenu, nabiału i cukru może wspierać funkcjonowanie osób z autyzmem i zaburzeniami neurorozwojowymi.";
  const defaultKeywords = "autyzm, dieta eliminacyjna, dieta w autyzmie, bez glutenu, bez nabiału, bez cukru, przepisy dla autyzmu, dieta bezglutenowa, zaburzenia neurorozwojowe";
  
  // Base URL for absolute image URLs (required by Google)
  const baseUrl = "https://www.autyzmodkuchni.pl";
  
  // Use provided values or fallback to defaults
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  
  // Current URL for canonical link if not provided
  const metaCanonical = canonical || typeof window !== 'undefined' ? window.location.href : '';
  
  // Convert relative ogImage path to absolute URL if needed
  // Google requires absolute URLs for og:image and other social meta tags
  const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath) return `${baseUrl}/img/logo.png`;
    // Already absolute URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Relative path starting with /
    if (imagePath.startsWith('/')) {
      return `${baseUrl}${imagePath}`;
    }
    // Relative path without leading /
    return `${baseUrl}/${imagePath}`;
  };
  
  const absoluteOgImage = getAbsoluteImageUrl(ogImage);
  
  // Double-check: ensure we never output relative URLs
  const finalOgImage = absoluteOgImage.startsWith('http') 
    ? absoluteOgImage 
    : `${baseUrl}/img/logo.png`;

  // Structured data for organization and logo
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Autyzm od Kuchni",
    "url": "https://www.autyzmodkuchni.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.autyzmodkuchni.pl/img/logo.png",
      "width": 200,
      "height": 200
    },
    "description": "Przepisy i porady żywieniowe dla osób z autyzmem. Zdrowa dieta, bezglutenowe przepisy, bezmleczne dania i wiele więcej.",
    "sameAs": [
      "https://www.autyzmodkuchni.pl"
    ]
  };

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook - Must use absolute URLs for Google */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:url" content={metaCanonical || baseUrl} />
      <meta property="og:site_name" content="Autyzm od Kuchni" />
      
      {/* Twitter - Must use absolute URLs for Google */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Canonical Link */}
      {metaCanonical && <link rel="canonical" href={metaCanonical} />}
      
      {/* Structured Data for Logo */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 