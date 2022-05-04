"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const uploadToS3 = (filename, data) => {
    try {
        const S3 = new s3_1.default({
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
                }
                else {
                    // console.log(res);
                    console.log(`${filename} successfully uploaded to AWS S3`);
                    resolve(res.Location);
                }
            });
        });
    }
    catch (error) {
        throw error;
    }
};
exports.uploadToS3 = uploadToS3;
