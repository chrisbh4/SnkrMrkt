require('dotenv').config()

// const fs = require("fs")
// const S3 = require("aws-sdk/clients/s3")
// const multer = require('multer')
const AWS = require("aws-sdk");
// name of your bucket here

const multer = require("multer");

//* check point for undoing git hub code

// imports AWS access secruly from .env
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY



//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01",
                        accessKeyId,
                        secretAccessKey,
                        region
});


AWS.config.update({accessKeyId, secretAccessKey, region})

const singlePublicFileUpload = async (file) => {
  const { originalname, mimetype, image } = await file;

  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: bucketName,
    Key,
    Body: image,
    ACL: "public-read",
  };
//   debugger
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
//   return result.Location;
  return result
};




const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);

  

module.exports = {
    s3,
    singleMulterUpload,
    singlePublicFileUpload
};

// // creates new connection to S3
// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKeyId
// })
// //-[x] uploads a file to s3
//     // console.log("s3 :",s3)


// // github code
//     const storage = multer.memoryStorage({
//         destination: function (req, file, callback) {
//           callback(null, "");
//         },
//       });

//      const singleMulterUpload = (nameOfKey) =>{
//         multer({ storage: storage }).single(nameOfKey)};

// exports.singleMulterUpload = singleMulterUpload;




// const uploadFile = async(file)=>{

//     const fileStream = fs.createReadStream(file.path);
//     //-[] works
//     console.log("fileStream :",fileStream)

//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileStream,
//         Key: file.image
//     }
//     // -[]works
//     console.log("uploadParams", uploadParams)
//     const result = await s3.upload(uploadParams).promise();

//     return result
// }

// // module.export = uploadFile;
// exports.uploadFile = uploadFile;

// // downloads a file from s3



// /*

// Plan :
//     1. Find how to connect to aws s3 and test connection
//         - make sure all npms are installed
//         - make sure I'm importing everything correctly

//     2. be able to upload a image properly to aws s3 and be able to access it inside the aws object
//         - upload to the correct bucket
//         - be able to identify the correct image
// */
