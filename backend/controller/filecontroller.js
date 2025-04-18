import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
    // Upload the file to S3
    const putCommand = new PutObjectCommand(uploadParams);
    await s3.send(putCommand);

    // Generate a signed URL (valid for 1 hour)
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, getCommand); // 1 hour
    

    return res.status(200).json({
      chatroomid,
      userid,
      fileUrl: signedUrl, // Secure, temporary URL
    });

  } catch (err) {
    console.error('S3 Upload Error:', err);
    return res.status(500).json({ error: 'S3 Upload Failed' });
  }
};