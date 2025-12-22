import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  author = "Autyzm od Kuchni",
  ogType = "website",
  ogImage = "/img/logo_bckgd.png",
  canonical,
  robots, // robots meta tag (e.g., "noindex, nofollow")
  structuredData, // Additional structured data (Recipe, BreadcrumbList, etc.)
  faqData // FAQPage structured data for AI Overview optimization
}) => {
  // Default title and description if not provided
  const defaultTitle = "Autyzm od Kuchni - Dieta eliminacyjna bez glutenu, nabiału i cukru";
  const defaultDescription = "Odkryj jak dieta eliminacyjna bez glutenu, nabiału i cukru może wspierać funkcjonowanie osób z autyzmem i zaburzeniami neurorozwojowymi.";
  const defaultKeywords = "dieta bezglutenowa autyzm, dieta autyzm, autyzm leczenie, autyzm, dieta eliminacyjna, dieta w autyzmie, bez glutenu, bez nabiału, bez cukru, przepisy dla autyzmu, dieta bezglutenowa, zaburzenia neurorozwojowe";
  
  // Base URL for absolute image URLs (required by Google)
  const baseUrl = "https://www.autyzmodkuchni.pl";
  
  // Use provided values or fallback to defaults
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  
  // Helper to ensure absolute URL
  const getAbsoluteUrl = (url) => {
    if (!url) return baseUrl;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('/')) {
      return `${baseUrl}${url}`;
    }
    return `${baseUrl}/${url}`;
  };
  
  // Current URL for canonical link if not provided - ensure it's absolute
  const metaCanonical = canonical 
    ? getAbsoluteUrl(canonical)
    : (typeof window !== 'undefined' ? window.location.href : baseUrl);
  
  // Convert relative ogImage path to absolute URL if needed
  // Google and WhatsApp require absolute URLs for og:image and other social meta tags
  const getAbsoluteImageUrl = (imagePath) => {
    if (!imagePath) return `${baseUrl}/img/logo_bckgd.png`;
    // Already absolute URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Relative path starting with /
    if (imagePath.startsWith('/')) {
      return `${baseUrl}${imagePath}`;
    }
    // Relative path without leading / - assume it's in /img/ folder
    if (!imagePath.startsWith('img/')) {
      return `${baseUrl}/img/${imagePath}`;
    }
    return `${baseUrl}/${imagePath}`;
  };
  
  const absoluteOgImage = getAbsoluteImageUrl(ogImage);
  
  // Double-check: ensure we never output relative URLs
  const finalOgImage = absoluteOgImage.startsWith('http') 
    ? absoluteOgImage 
    : `${baseUrl}/img/logo_bckgd.png`;

  // Structured data for organization and logo
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Autyzm od Kuchni",
    "url": "https://www.autyzmodkuchni.pl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.autyzmodkuchni.pl/img/logo_bckgd.png",
      "width": 200,
      "height": 200
    },
    "description": "Przepisy i porady żywieniowe dla osób z autyzmem. Zdrowa dieta, bezglutenowe przepisy, bezmleczne dania i wiele więcej.",
    "sameAs": [
      "https://www.autyzmodkuchni.pl"
    ]
  };

  // Structured data for WebSite with SearchAction (sitelinks search box)
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": baseUrl,
    "name": "Autyzm od Kuchni",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      {robots && <meta name="robots" content={robots} />}
      
      {/* Open Graph / Facebook / WhatsApp - Must use absolute URLs */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:alt" content={metaTitle} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:site_name" content="Autyzm od Kuchni" />
      <meta property="og:locale" content="pl_PL" />
      
      {/* Twitter - Must use absolute URLs for Google */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Canonical Link */}
      {metaCanonical && <link rel="canonical" href={metaCanonical} />}
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {/* Structured Data for WebSite with SearchAction */}
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      
      {/* Additional Structured Data (Recipe, BreadcrumbList, etc.) */}
      {structuredData && Array.isArray(structuredData) && structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
      {structuredData && !Array.isArray(structuredData) && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* FAQPage Schema - Critical for Google AI Overview */}
      {faqData && Array.isArray(faqData) && faqData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 