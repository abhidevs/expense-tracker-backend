const AWSS3 = require("aws-sdk/clients/s3");

exports.uploadToS3 = (filename, data) => {
  try {
    const S3 = new AWSS3({
      accessKeyId: process.env.IAM_USER_KEY,
      secretAccessKey: process.env.IAM_USER_SECRET,
    });

    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      S3.upload(params, (err, res) => {
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
