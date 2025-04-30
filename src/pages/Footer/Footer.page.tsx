import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./Footer.css";
import { IconButton } from "@mui/material";
import { NewReleases, Newspaper, Telegram, YouTube } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { VisaIcon } from "@/shared/Svgs/Svg.component";
import { PaymentMenuFooter } from "@/datafake/Menu";

export default function FooterPage() {
  return (
    <footer>
      <div className="info-footer">
        <Image src="/images/logo.svg" width={130} height={100} alt="" />
        <div className="info-title">
          <h2>
            DA88 - Nhà cái thể thao trực tuyến, Siêu chợ games đổi thưởng đỉnh
            cao
          </h2>
          <p>
            DA88 là trang cá cược thể thao hấp dẫn, cung cấp đa dạng về sản phẩm
            trò chơi như Thể Thao, Trò Chơi, Casino Trực Tuyến và thưởng hoàn
            trả cao nhất trên thị trường.
          </p>
        </div>
      </div>
      <div className="list-menu">
        <div className="menu-1">
          <h3>Thể thao</h3>
          <ul>
            <li>
              <Link href={"#"}>Lịch thi đấu</Link>
            </li>
            <li>
              <Link href={"#"}> Cược thể thao</Link>
            </li>
          </ul>
        </div>
        <div className="menu-1">
          <h3>Trò chơi</h3>
          <ul>
            <li>
              <Link href={"#"}>Lịch thi đấu</Link>
            </li>
            <li>
              <Link href={"#"}> Cược thể thao</Link>
            </li>
          </ul>
        </div>
        <div className="menu-2">
          <h3>Trò chơi</h3>
          <ul>
            <li>
              <Link href={"#"}>
                <Telegram /> Telegram support
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                {" "}
                <Newspaper />
                Blog
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <YouTube /> Youtube
              </Link>
            </li>
          </ul>
        </div>
        <div className="menu-3">
          <h3>Payment Partners</h3>
          <ul>
            {PaymentMenuFooter.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  style={{ height: "50px", alignItems: "center" }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="title-2">
        <p>Copyright © Reddy232 2010-2026 All rights reserved</p>
      </div>
    </footer>
  );
}
