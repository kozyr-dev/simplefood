import { useAuthStore } from "./store";

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ token: null });
  });

  it("has null as the initial token", () => {
    expect(useAuthStore.getState().token).toBeNull();
  });

  it("setToken updates the token", () => {
    useAuthStore.getState().setToken("my-jwt");
    expect(useAuthStore.getState().token).toBe("my-jwt");
  });

  it("resetToken sets the token back to null", () => {
    useAuthStore.getState().setToken("my-jwt");
    useAuthStore.getState().resetToken();
    expect(useAuthStore.getState().token).toBeNull();
  });

  it("setToken accepts null to clear the token", () => {
    useAuthStore.getState().setToken("my-jwt");
    useAuthStore.getState().setToken(null);
    expect(useAuthStore.getState().token).toBeNull();
  });
});
