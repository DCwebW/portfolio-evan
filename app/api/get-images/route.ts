// // app/api/get-images/route.ts
// import { list, ListBlobResultBlob } from '@vercel/blob';
// import { NextResponse } from 'next/server';

// export async function GET(): Promise<NextResponse<{ blobs: ListBlobResultBlob[] }>> {
//   const { blobs } = await list({ prefix: 'Graphisme/' });
//   const filtered = blobs.filter(
//     (blob) => !blob.pathname.endsWith('/') && blob.size > 0
//   );
//   return NextResponse.json({ blobs: filtered });
// }