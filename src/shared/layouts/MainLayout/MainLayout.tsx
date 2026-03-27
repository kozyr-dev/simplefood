import { JSX } from "react";
import styles from "./MainLayout.module.scss";
import { Navbar } from "@/widgets/Navbar/Navbar";
import Footer from "@/shared/ui/partials/Footer/Footer";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className={styles["main-layout"]}>
      <header className={styles["page-header"]}>
        <Navbar />
      </header>
      <main className={styles["page-content"]}>{children}</main>
      <footer className={styles["page-footer"]}>
        <Footer />
      </footer>
    </div>
  );
}
