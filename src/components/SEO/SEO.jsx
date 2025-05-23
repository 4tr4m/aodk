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
  
  // Use provided values or fallback to defaults
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  
  // Current URL for canonical link if not provided
  const metaCanonical = canonical || typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={metaCanonical} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical Link */}
      {metaCanonical && <link rel="canonical" href={metaCanonical} />}
    </Helmet>
  );
};

export default SEO; 