import React from "react";
import Link from "next/link";

import { Spin, Popover, Button } from "antd";

import { Error } from "../Error";
import { Header } from "../Header";
import { Back } from "../Back";

import styles from "../../styles/Home.module.css";
import { About } from "../About";

export function Home({ data, show }) {
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
      <About />
      <section>
        <h2 className={styles.title}> Todas as cartas:</h2>
        <div className={styles.allCards}>
          {data.map((m) => (
            <Popover
              // className={styles.informations}

              title="Informações da carta"
              content={(content) => {
                return (content = (
                  <ul>
                    <li>
                      <span>Número da carta</span>
                      <p>{m.cardnumber}</p>
                    </li>

                    <li>
                      <span>Tipo de carta</span>
                      <p>{m.type}</p>
                    </li>

                    <li>
                      <Button onClick={() => m.cardnumber}>
                        <Link href={"../Card/" + m.cardnumber}>
                          {" "}
                          Mais informações
                        </Link>
                      </Button>
                    </li>
                  </ul>
                ));
              }}
              placement="top"
              trigger="hover"
            >
              <Link href={"../Card/" + m.cardnumber}>
                <img src={m.image_url} className={styles.images} />
              </Link>
            </Popover>
          ))}
        </div>
      </section>
    </div>
  );
}
