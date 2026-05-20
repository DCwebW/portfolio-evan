// components/Gallery.tsx
'use client';
import { ListBlobResult } from '@vercel/blob';
import { useEffect, useState } from 'react';

export default function Gallery() {
  const [images, setImages] = useState<ListBlobResult>();

  useEffect(() => {
    fetch('/api/get-images')
      .then(res => res.json())
      .then(data => {setImages(data.blobs) ; console.log(data)});
  }, []);

// if(images)
//   return (
    
//     <div>
//       {images.blobs.map((img) => (
//         <img key={img.url} src={img.url} alt={img.pathname} />
//       ))}
//     </div>
//   );

return images?.blobs
}