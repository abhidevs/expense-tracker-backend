import AWSS3 from "aws-sdk/clients/s3";

export const uploadToS3 = (filename: string, data: any) => {
  try {
    const S3 = new AWSS3({
      accessKeyId: process.env.IAM_USER_KEY,
      secretAccessKey: process.env.IAM_USER_SECRET,
    });

    let params: any = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      S3.upload(params, (err: any, res: any) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // console.log(res);
          console.log(`${filename} successfully uploaded to AWS S3`);
          resolve(res.Location);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
