'use client'

import React, { JSX } from "react";
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import styles from "./FooterNav.module.scss";

const footerMenu = [{
  id: 1,
  Link: '#',
  Title: 'Акції',
  Classname: ''
}, {
  id: 2,
  Link: '#',
  Title: 'Про нас',
  Classname: ''
}, {
  id: 3,
  Link: '#',
  Title: 'Доставка',
  Classname: ''
}, {
  id: 4,
  Link: '#',
  Title: 'Новини та статтi',
  Classname: ''
}, {
  id: 5,
  Link: '#',
  Title: 'Контакти',
  Classname: ''
}];

export default function FooterNav(): JSX.Element {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  const currentRoute = params?.slug || pathname;

  return (
    <div className={styles['page-footer-nav']}>
      <div className="menu-footer-menu-container">
        {footerMenu && (
          <ul>
            {footerMenu.map((item) => (
              <li className={'menu-item ' + (item?.Classname || '')} key={item.id}>
                <Link href={item.Link} className={currentRoute === item.Link?.replace('/', '') ? 'active' : ''}>
                  {item.Title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
