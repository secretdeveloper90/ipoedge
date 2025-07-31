import { useEffect } from 'react';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
}

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update document title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let linkTag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        document.head.appendChild(linkTag);
      }
      
      linkTag.setAttribute('href', href);
    };

    // Update basic meta tags
    if (seoData.description) {
      updateMetaTag('description', seoData.description);
    }

    if (seoData.keywords) {
      updateMetaTag('keywords', seoData.keywords);
    }

    // Update robots meta tag
    const robotsContent = [];
    if (seoData.noindex) robotsContent.push('noindex');
    else robotsContent.push('index');
    
    if (seoData.nofollow) robotsContent.push('nofollow');
    else robotsContent.push('follow');
    
    updateMetaTag('robots', robotsContent.join(', '));

    // Update canonical URL
    if (seoData.canonical) {
      updateLinkTag('canonical', seoData.canonical);
    }

    // Update Open Graph tags
    if (seoData.ogTitle) {
      updateMetaTag('og:title', seoData.ogTitle, true);
    }

    if (seoData.ogDescription) {
      updateMetaTag('og:description', seoData.ogDescription, true);
    }

    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage, true);
    }

    if (seoData.ogUrl) {
      updateMetaTag('og:url', seoData.ogUrl, true);
    }

    if (seoData.ogType) {
      updateMetaTag('og:type', seoData.ogType, true);
    }

    // Update Twitter Card tags
    if (seoData.twitterCard) {
      updateMetaTag('twitter:card', seoData.twitterCard);
    }

    if (seoData.twitterTitle) {
      updateMetaTag('twitter:title', seoData.twitterTitle);
    }

    if (seoData.twitterDescription) {
      updateMetaTag('twitter:description', seoData.twitterDescription);
    }

    if (seoData.twitterImage) {
      updateMetaTag('twitter:image', seoData.twitterImage);
    }

    // Add structured data
    if (seoData.structuredData) {
      // Remove existing structured data script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seoData.structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // We don't remove meta tags on cleanup as they should persist
      // until the next page sets new ones
    };
  }, [seoData]);
};

export default useSEO;
