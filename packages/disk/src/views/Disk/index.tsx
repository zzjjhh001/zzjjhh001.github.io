import { defineComponent } from "vue";
import styles from './index.module.scss';
const component = defineComponent({
  name: 'DiskView',
  setup() {
    return () => (
      <div class={styles.main}>
        <div>qwewq</div>
      </div>
    )
  },
});
export default component;
