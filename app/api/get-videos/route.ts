import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const { Contents = [] } = await r2.send(
    new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET_VIDEO })
  );

  const videos = await Promise.all(
    Contents
      .filter((obj) => obj.Key && obj.Size && obj.Size > 0)
      .map(async (obj) => {
        const url = await getSignedUrl(
          r2,
          new GetObjectCommand({ Bucket: process.env.R2_BUCKET_VIDEO, Key: obj.Key! }),
          { expiresIn: 3600 }
        );
        return { url, key: obj.Key! };
      })
  );

  return NextResponse.json({ videos });
}
