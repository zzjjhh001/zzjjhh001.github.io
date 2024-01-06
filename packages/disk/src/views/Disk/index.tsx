import { defineComponent } from "vue";
import { getCos } from "@/utils";
import styles from './index.module.scss';
import { lifeConfig } from '@/utils/const';
const component = defineComponent({
  name: 'DiskView',
  setup() {
    const uploadFile = () => {
      const cos = getCos();
      const { Bucket, Region } = lifeConfig;
      cos.getBucket({
        Bucket, /* 填写自己的 bucket，必须字段 */
        Region,     /* 存储桶所在地域，必须字段 */
        Prefix: '',           /* 列出目录 a 下所有文件，非必须 */
      }, function(err, data) {
        console.log(err || data.Contents);
      });
    }
    return () => (
      <div class={styles.main}>
        <div onClick={uploadFile}>qwewq</div>
      </div>
    )
  },
});
export default component;
