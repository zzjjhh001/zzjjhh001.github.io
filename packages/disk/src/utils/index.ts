import COS from 'cos-js-sdk-v5';
import { SECRET_ID, SECRET_KEY, lifeConfig } from './const';
let cosInstance: COS | null = null;
export const getCos = () => {
  if(!cosInstance) {
    cosInstance = new COS({
      SecretId: SECRET_ID,
      SecretKey: SECRET_KEY,
    });
  }
  return cosInstance;
}
export const uploadFile = (fileName: string, file: File, Func: Function) => {
  const cos = getCos();
  const { Bucket, Region } = lifeConfig;
  cos.uploadFile({
    Bucket, /* 填入您自己的存储桶，必须字段 */
    Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    Key: fileName,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
    SliceSize: 1024 * 1024 * 5,
    onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
    }
  }, function(err, data) {
    Func(err, data);
  });
}