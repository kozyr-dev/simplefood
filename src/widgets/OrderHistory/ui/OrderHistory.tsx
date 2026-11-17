"use client";

import { JSX, useState } from "react";
import { useMyOrdersQuery, type Order } from "@/entities/Order";
import { useSessionStatus } from "@/shared/session";
import Pagination from "@/shared/ui/elements/Pagination/Pagination";
import { formatPrice } from "@/shared/utils/helpers/money";
import styles from "./OrderHistory.module.scss";

const STATUS: Record<Order["status"], string> = {
  new: "нове",
  processing: "готується",
  completed: "виконано",
  declined: "скасовано",
};

const DATE = new Intl.DateTimeFormat("uk-UA", { dateStyle: "medium", timeStyle: "short" });

/** The lines; orders imported from the old site have only their text. */
function OrderLines({ order }: { order: Order }): JSX.Element {
  if (!order.items.length) return <p className={styles.items}>{order.legacyItemsText}</p>;
  return (
    <ul className={styles.items}>
      {order.items.map((item, index) => (
        <li key={index}>
          {item.title} × {item.quantity}
        </li>
      ))}
    </ul>
  );
}

/** The signed-in customer's orders, newest first (orders placed as a guest aren't linked). */
export function OrderHistory(): JSX.Element {
  const [page, setPage] = useState(1);
  const signedIn = useSessionStatus() === "authenticated";
  const { data, isLoading, isError } = useMyOrdersQuery(page, signedIn);

  return (
    <div>
      <h4>Мої замовлення</h4>
      {isLoading && <p>Завантаження…</p>}
      {isError && <p>Не вдалося завантажити замовлення. Спробуйте пізніше.</p>}
      {data && !data.data.length && <p className="gray">Замовлень ще немає.</p>}
      {data && data.data.length > 0 && (
        <>
          <table className={styles.orders}>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Страви</th>
                <th>Статус</th>
                <th className={styles.total}>Сума</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((order) => (
                <tr key={order.id}>
                  <td>{order.number}</td>
                  <td>{DATE.format(new Date(order.createdAt))}</td>
                  <td>
                    <OrderLines order={order} />
                  </td>
                  <td>{STATUS[order.status]}</td>
                  <td className={styles.total}>{formatPrice(order.subtotal)} грн</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination {...data.meta} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
