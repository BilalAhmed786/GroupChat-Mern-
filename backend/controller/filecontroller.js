import { PutObjectCommand} from '@aws-sdk/client-s3';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import s3 from '../s3/s3.js';
export const fileroute = async (req, res) => {
  const file = req.file;
  const { chatroomid, userid } = req.body;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fileStream = fs.createReadStream(file.path);
  const key = `Groupchat/${file.filename}`;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  try {
    // Upload to S3 (bucket is private, CloudFront will serve it)
    const putCommand = new PutObjectCommand(uploadParams);
    await s3.send(putCommand);

    // ❗ Replace with your actual CloudFront domain
    const fileUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;

    return res.status(200).json({
      chatroomid,
      userid,
      fileUrl, // Now served via CloudFront 🔥
    });

  } catch (err) {
    console.error('S3 Upload Error:', err);
    return res.status(500).json({ error: 'S3 Upload Failed' });
  }

}