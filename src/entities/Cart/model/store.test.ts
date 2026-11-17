import { act } from "@testing-library/react";

/** Loads the store fresh, as a page load would, with `saved` in localStorage. */
async function loadCartWith(saved: object | null) {
  localStorage.clear();
  if (saved) localStorage.setItem("cart-storage", JSON.stringify(saved));
  jest.resetModules();
  const { useCartStore } = await import("./store");
  return useCartStore;
}

describe("cart store", () => {
  it("empties a cart saved by the Strapi site: its numeric ids and hryvnias mean nothing now", async () => {
    const store = await loadCartWith({
      state: { items: [{ id: 3, title: "Борщ", image: {}, price: 85, amount: 2 }], totalAmount: 170 },
      version: 0,
    });

    expect(store.getState()).toMatchObject({ items: [], totalAmount: 0 });
    expect(typeof store.getState().addItem).toBe("function");
  });

  it("keeps a cart saved by this version", async () => {
    const item = { id: "019a-borsch", title: "Борщ", image: null, price: 8500, amount: 2 };
    const store = await loadCartWith({ state: { items: [item], totalAmount: 17000 }, version: 1 });

    expect(store.getState()).toMatchObject({ items: [item], totalAmount: 17000 });
  });

  it("adds up in kopiykas", async () => {
    const store = await loadCartWith(null);

    act(() => {
      store.getState().addItem({ id: "a", title: "A", image: null, price: 8550, amount: 2 });
      store.getState().addItem({ id: "a", title: "A", image: null, price: 8550, amount: 1 });
    });

    expect(store.getState()).toMatchObject({ totalAmount: 25650, items: [{ id: "a", amount: 3 }] });
  });
});
