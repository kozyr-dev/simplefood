import clsx from "clsx";
import { JSX } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import { ProductCard } from "@/widgets/ProductCard";
import { ProductListProps } from "../model/types";
import styles from "./ProductList.module.scss";

/**
 * A products section. The API already picked them (featured, favorite, a
 * category or the editor's selection), dropped unavailable ones and set
 * the order: they're shown as they come.
 */
export function ProductList(props: ProductListProps): JSX.Element {
  const { title, layout, products, className, anchorId } = props;

  return (
    <div
      className={clsx("page-section", "section-padding", styles["section-products"], styles[className || ""])}
      id={anchorId ?? undefined}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {title && (
              <h2 className="section-title">
                <ReactMarkdown>{title}</ReactMarkdown>
              </h2>
            )}

            {layout === "slider" && (
              <Splide
                className={styles["products-slider"]}
                options={{
                  arrows: true,
                  pagination: true,
                  perPage: 4,
                }}
              >
                {products.map((product) => (
                  <SplideSlide key={product.id} className="products-slider__slide">
                    <ProductCard {...product} />
                  </SplideSlide>
                ))}
              </Splide>
            )}

            {layout === "grid" && (
              <div className={styles["products-grid"]}>
                {products.map((product) => (
                  <div key={product.id} className={styles["products-grid__el"]}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
