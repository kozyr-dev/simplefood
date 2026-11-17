import React, { useEffect, JSX } from "react";
import Image from "next/image";
import MicroModal from "micromodal";
import Portal from "@/shared/ui/Portal/Portal";
import ModalCallUs from "@/shared/ui/modals/ModalCallUs/ModalCallUs";
import type { Settings } from "@/shared/api";
import styles from "./NavbarTelStyles.module.scss";

export default function NavbarTel({ settings }: { settings: Settings }): JSX.Element {
  useEffect(() => {
    // Dynamically load MicroModal.js
    (async () => {
      MicroModal.init({
        disableScroll: true,
        disableFocus: true,
        awaitCloseAnimation: true,
        debugMode: false,
      });
    })();
  }, []);

  const openCallMeModal = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    MicroModal.show("callMeModal");
  };

  return (
    <>
      <div className={styles.tel}>
        <Image src="/phone.png" alt="" width="35" height="35" />
        <p className={styles.phone}>
          {settings.phone}
          <span onClick={openCallMeModal}>
            <a href="#">замовити зворотній дзвінок</a>
          </span>
        </p>
      </div>
      <Portal>
        <ModalCallUs phone={settings.phone ?? ""} />
      </Portal>
    </>
  );
}
