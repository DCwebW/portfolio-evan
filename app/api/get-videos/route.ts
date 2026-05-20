// app/api/get-images/route.ts
import { list, ListBlobResultBlob } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<{ blobs: ListBlobResultBlob[] }>> {
  const { blobs } = await list({ prefix: 'Video/' });
  return NextResponse.json({ blobs });
}
