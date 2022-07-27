import AWS from "aws-sdk";
import { ReadStream } from "fs";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const UploadToS3 = async (
  uploadFile: any,
  userId: number,
  foldName?: string
) => {
  const {
    file: { filename, createReadStream },
  } = await uploadFile;
  const readStream: ReadStream = createReadStream();
  const objectName = `${foldName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "finder-uploads",
      Key: objectName,
      Body: readStream,
      ACL: "public-read-write",
    })
    .promise();
  return Location;
};

const S3 = new AWS.S3();

export const deleteToS3 = async (fileUrl: any, folderName: string) => {
  const decodeUrl = decodeURI(fileUrl);
  const filePath = decodeUrl.split(folderName)[0];
  const fileName = `${folderName}${filePath}`;

  S3.deleteObject({
    Bucket: "finder-uploads",
    Key: fileName,
  }).promise();
};
