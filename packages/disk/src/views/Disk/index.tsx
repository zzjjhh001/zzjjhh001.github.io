import { defineComponent,ref, watch } from "vue";
import { getCos } from "@/utils";
import styles from './index.module.scss';
import { lifeConfig } from '@/utils/const';
import { message, Select, Input, Button } from "ant-design-vue";
import { uploadFile } from "@/utils";
import user from '@/stores/counter';
const component = defineComponent({
  name: 'DiskView',
  setup() {
    const store = user();
    const fileList = ref<any[]>([]);
    const cos = getCos();
    const { Bucket, Region } = lifeConfig;
    const getFiles = (prefix: string = ''): Promise<any[]> => {
      return new Promise((resovle, reject) => {
        cos.getBucket({
          Bucket, /* 填写自己的 bucket，必须字段 */
          Region,     /* 存储桶所在地域，必须字段 */
          Prefix: prefix,           /* 列出目录 a 下所有文件，非必须 */
        }, function(err, data) {
          console.log(err || data.Contents);
          if (!err) {
            resovle(data.Contents);
          } else {
            reject(err);
          }
        });
      })
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
    const uploadHandle = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      const proList: Promise<Boolean>[] = [];
      Array.prototype.forEach.call(
        files,
        (item => {
          const { name } = item!;
          proList.push(upload(`${curDirKey.value}/${name}`, item));
        })
      );
      store.isLoading = true;
      Promise.all(proList).then(() => {
        message.success('上传成功');
        getFiles(`${curDirKey.value}/`).then(data => {
          fileList.value = data;
        });
      }).catch(() => {
        message.error('上传失败');
      }).finally(() => {
        store.isLoading = false;
      });
    };
    const upload = (fileName: string, file: File | '') => {
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
    const dirList = ref<{ value: string; label: string }[]>([]);
    const curDirKey = ref<string>('');
    watch(() => curDirKey.value, async() => {
      const data = await getFiles(`${curDirKey.value}/`);
      fileList.value = data;
    })
    const addKey = ref<string>('');
    const addDir = async() => {
      if (!addKey.value.trim()) {
        return;
      }
      try {
        await upload(`${addKey.value}/`, '');
        dirList.value.push({ label: addKey.value, value: addKey.value });
        addKey.value = '';
        message.success('创建成功');
      } catch {
        message.error('创建文件夹失效，请重试');
      }
    }
    const init = async() => {
      const data = await getFiles();
      dirList.value = data.filter(item => item.Key.endsWith('/')).map(item => {
        return {
          label: item.Key.substring(0, item.Key.length - 1),
          value: item.Key.substring(0, item.Key.length - 1)
        }
      })
      curDirKey.value = dirList.value[0].value;
    };
    init();
    return () => (
      <div class={styles.main}>
        <div>
          <span>当前文件夹：</span>
          <Select
            v-model:value={curDirKey.value}
            style="width: 120px"
            options={dirList.value}
          ></Select>
        </div>
        <div class={styles.add_box}>
          <span>新增文件夹：</span>
          <Input type="text" v-model:value={addKey.value} />
          <Button onClick={addDir}>添加</Button>
        </div>
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
