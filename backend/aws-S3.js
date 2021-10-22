require('dotenv').config()

const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKeyId = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKeyId
})
// uploads a file to s3

const uploadFile = async(file)=>{
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.image
    }
    const result = await s3.upload(uploadParams).promise();

    return result
}

// module.export = uploadFile;
exports.uploadFile = uploadFile;

// downloads a file from s3
