import { Space } from "antd";
import styles from "../../styles/About.module.css";

export function About() {
  return (
    <section className={styles.container}>
      <div className={styles.separa}>
        <Space direction="horizontal" align="end" className={styles.about}>
          Desenvolvido por
          <a href="https://github.com/isazvdd" target="_blank">
            Isadora Azevedo
          </a>
          e
          <a href="https://github.com/israelsilva282" target="_blank">
            Israel Costa
          </a>
        </Space>
      </div>
    </section>
  );
}
