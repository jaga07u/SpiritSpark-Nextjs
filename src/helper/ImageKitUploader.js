
import ImageKit from "imagekit";
import { v4 as uuid } from "uuid";
const imagekit = new ImageKit({
    publicKey: "public_SOzJ6xLTq3Lf7kUuYPc5cWCDnlY=",
    privateKey: "private_UrEBz2hlq1W1lTOfu4f10HzhUWk=",
    urlEndpoint: "https://ik.imagekit.io/pqak7zrju",
  });

export function ImageKitUpload(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
          file: file,
          fileName: `${uuid()}-BgImage`,
          folder: "/QuoteBgImage",
          useUniqueFileName: false,
          overwriteFile: true
        }, function (err, result) {
          if (err) {
            console.error(err);
            reject(err); // Reject the promise if there's an error
          } else {
            resolve(result); // Resolve the promise with the result
          }
        });
      });
}
