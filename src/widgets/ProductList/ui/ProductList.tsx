import clsx from "clsx";
import { JSX, useState } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import { ProductCard } from "@/widgets/ProductCard";
import { Product } from "@/entities/Product";
import { ProductListProps } from "../model/types";
import styles from "./ProductList.module.scss";

export function ProductList(props: ProductListProps): JSX.Element {
  const {
    title,
    source,
    layout,
    products: productsPropData,
    product_category,
    custom_Class,
    custom_ID,
  } = props.rawData;
  const rawProducts = props.rawProducts;

  const [products] = useState<Array<Product>>(() => {
    let data: Array<Product> = [];

    // set products data
    if (source === "Selected" && productsPropData.length) {
      data = productsPropData;
    } else if (source === "Category" && product_category) {
      //TODO: fix product_category type and remove ts-ignore
      // @ts-ignore
      data = product_category.data.attributes.products.data;
    } else if (source === "Featured") {
      data = rawProducts.filter((product) => {
        return product.featured === true;
      });
    } else if (source === "Favorite") {
      data = rawProducts.filter((product) => {
        return product.favorite === true;
      });
    }

    // remove not available products
    data = data.filter((product) => {
      return product.available === true;
    });

    return data;
  });

  return (
    <div
      className={clsx("page-section", "section-padding", styles["section-products"], styles[custom_Class || ""])}
      id={custom_ID || ""}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {title && (
              <h2 className="section-title">
                <ReactMarkdown>{title}</ReactMarkdown>
              </h2>
            )}

            {layout === "Slider" && (
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
                    <ProductCard {...product} id={product.id} />
                  </SplideSlide>
                ))}
              </Splide>
            )}

            {layout === "Grid" && (
              <div className={styles["products-grid"]}>
                {products.map((product) => (
                  <div key={product.id} className={styles["products-grid__el"]}>
                    <ProductCard {...product} id={product.id} />
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
