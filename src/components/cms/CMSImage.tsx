import React, { useState } from 'react';
import { sanitizeUrl } from '../../utils/security';

interface CMSImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK = `${import.meta.env.BASE_URL}images/leadership-presentation.jpg`;

export const CMSImage: React.FC<CMSImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  containerClassName = '',
  className = '',
  ...props
}) => {
  const safeFallback = sanitizeUrl(fallbackSrc, DEFAULT_FALLBACK);
  const safeSrc = sanitizeUrl(src, safeFallback);
  const [currentSrc, setCurrentSrc] = useState<string>(safeSrc);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError && currentSrc !== safeFallback) {
      setCurrentSrc(safeFallback);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
};
