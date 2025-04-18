import { useEffect, useRef } from "react";

export const ChatImage = ({ src, alt, lastMessageRef }) => {
    
    const imgRef = useRef();
  
    useEffect(() => {
      const scroll = () => {
        if (lastMessageRef?.current) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
      if (imgRef.current) {
        if (imgRef.current.complete) {
          scroll();
        } else {
          imgRef.current.onload = scroll;
        }
      }
    }, [src]);
  
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="rounded-lg max-w-xs"
      />
    );
  };
  