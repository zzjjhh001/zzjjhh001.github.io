import { defineComponent,ref } from "vue";
import { getCos } from "@/utils";
import styles from './index.module.scss';
import { lifeConfig } from '@/utils/const';
import { message } from "ant-design-vue";
import { uploadFile } from "@/utils";
import user from '@/stores/counter';
const component = defineComponent({
  name: 'DiskView',
  setup() {
    const store = user();
    const fileList = ref<any[]>([]);
    const cos = getCos();
    const { Bucket, Region } = lifeConfig;
    const getFiles = () => {
      cos.getBucket({
        Bucket, /* 填写自己的 bucket，必须字段 */
        Region,     /* 存储桶所在地域，必须字段 */
        Prefix: '',           /* 列出目录 a 下所有文件，非必须 */
      }, function(err, data) {
        console.log(err || data.Contents);
        if(!err) {
          fileList.value = data.Contents;
        }
      });
    }
    const itemShow = (item: any) => {
      const { Key } = item;
      return <div>{Key}</div>;
    }
    const uploadClick = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple  = true;
      input.accept = 'image/*,video/*';
      input.addEventListener('change', uploadHandle);
      input.click();
    }
    const error = ref('');
    const uploadHandle = (e: Event) => {
      console.log(222, e);
      console.log(222, e.target);
      console.log(222, (e.target as HTMLInputElement).files);
      const files = (e.target as HTMLInputElement).files;
      const proList: Promise<Boolean>[] = [];
      Array.prototype.forEach.call(
        files,
        (item => {
          const { name } = item!;
          proList.push(upload(name, item));
        })
      );
      store.isLoading = true;
      Promise.all(proList).then(() => {
        message.success('上传成功');
        getFiles();
      }).catch(() => {
        message.error('上传失败');
      }).finally(() => {
        store.isLoading = false;
      });
    };
    const upload = (fileName: string, file: File) => {
      return new Promise<Boolean>((resovle, reject) => {
        const Func = (err: Boolean, data: Boolean) => {
          if (err) {
            reject(err);
          }  else {
            resovle(data);
          }
        }
        uploadFile(fileName, file, Func);
      })
    };
    getFiles();
    return () => (
      <div class={styles.main}>
        <div>{error.value}</div>
        <div>点击上传文件，将文件备份到腾讯云上，上传结束前不要刷新页面</div>
        <div class={styles.upload} onClick={uploadClick}>上传文件</div>
        <div class={styles.fileList}>
        {
          fileList.value.map(itemShow)
        }
        </div>
      </div>
    )
  },
});
export default component;
