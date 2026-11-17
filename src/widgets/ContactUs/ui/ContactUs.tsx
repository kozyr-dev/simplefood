"use client";

import { JSX } from "react";
import ReactMarkdown from "react-markdown";
import { ContactUsProps } from "../model/types";
import { prefixContentImages } from "@/shared/utils/helpers/media";
import { ContactForm } from "./ContactForm";
import styles from "./ContactUs.module.scss";

function createMarkup(content: string) {
  return { __html: prefixContentImages(content) };
}

export function ContactUs(props: ContactUsProps): JSX.Element {
  return (
    <>
      <section className="page-section section-padding section-contact">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-row">
            <div className="basis-full">
              {props.title && (
                <div className="section-title">
                  <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
                </div>
              )}
              <div className="flex flex-row gap-x-5">
                <div className="basis-1/3">
                  {props.content && (
                    <div className={styles["content"]} dangerouslySetInnerHTML={createMarkup(props.content)}></div>
                  )}
                </div>
                <div className="basis-1/3">
                  {props.secondaryContent && (
                    <div className={styles["content"]} dangerouslySetInnerHTML={createMarkup(props.secondaryContent)}></div>
                  )}
                </div>
                <div className="basis-1/3">
                  <div className={styles["content"]}>{props.formTitle && <h4>{props.formTitle}</h4>}</div>
                  {props.showForm && <ContactForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"map-sect container max-w-full"}>
        {props.mapEmbedCode && (
          <div className={styles.embedCode} dangerouslySetInnerHTML={{ __html: props.mapEmbedCode }} />
        )}
      </section>
    </>
  );
}
