import React from "react";
import { Spin } from "antd";
import Link from "next/link";

import { Error } from "../../components/Error";
import { Header } from "../../components/Header";
import styles from "../../styles/Home.module.css";

export default function Home({ data, show }) {
  if (!show) return <div></div>;

  if (data.Error) {
    return <Error error={data.Error} />;
  }

  if (data.Search === "") {
    return <Spin />;
  }

  return (
    <div>
      <Header />
      <section>
        <h2 className={styles.title}> Todas as cartas:</h2>
        <div className={styles.allCards}>
          {data.map((m) => (
            <Link href={"../Card/" + m.cardnumber}>
              <img src={m.image_url} className={styles.images} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
