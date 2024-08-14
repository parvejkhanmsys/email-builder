import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer({ footerData }) {
  const footerLogo =
    "https://cdn-staging-static.heartfulnessmagazine.com/heartfulness_advancing_logo_white_e5db359e11.svg";


  const FooterSubmenu1 ="Social";

  const FooterSubmenu2 ="Useful Links";
  const FooterSubmenu3 ="Insights";

  const Copyright =
    "© 2024 Heartfulness - All rights reserved";

  const SubMenu1 = [
    {
      id: 5,
      Title: "LinkedIn",
      Slug: "https://www.linkedin.com/company/heartfulness",
      img: "https://heartfulness-events.s3.ap-south-1.amazonaws.com/linkedin_1_1_5e8be86b77.webp",
    },
    {
      id: 6,
      Title: "Facebook",
      Slug: "https://www.facebook.com/practiceheartfulness/",
      img: "https://heartfulness-events.s3.ap-south-1.amazonaws.com/facebook_1_1_cb4521f869.webp",
    },
    {
      id: 7,
      Title: "Instagram",
      Slug: "https://www.instagram.com/heartfulness/",
      img: "https://heartfulness-events.s3.ap-south-1.amazonaws.com/instagram_1_57d54dd2f6.webp",
    },
    {
      id: 7,
      Title: "Whatsapp",
      Slug: "https://www.whatsapp.com/channel/0029Va4ShzHBA1ez8jLdYf00",
      img: "https://heartfulness-events.s3.ap-south-1.amazonaws.com/whatsapp_1_44bf39e999.webp",
    },
  ];

  const SubMenu2 = footerData?.data?.attributes?.SubMenu2 || [
    {
      id: 8,
      Title: "About Us",
      Slug: "https://heartfulness.org/en/about-heartfulness/",
    },
    {
      id: 9,
      Title: "Contact Us",
      Slug: "mailto: pallavi.rao@volunteer.heartfulness.org",
    },
    { id: 10, Title: "Donate", Slug: "https://donations.heartfulness.org/" },
  ];
  const SubMenu3 = [
    // { id: 8, Title: "Humans of Hearfulness", Slug: "/" },
    {
      id: 9,
      Title: "Heartfulness Initiatives",
      Slug: "https://heartfulness.org/en/heartfulness-initiatives/",
    },
    {
      id: 10,
      Title: "Heartfulness Magazine",
      Slug: "https://heartfulness.org/magazine",
    },
  ];

  const BottomMenus = [
    { id: 11, Title: "Terms", Slug: "https://heartfulness.org/en/terms/" },
    {
      id: 12,
      Title: "Privacy",
      Slug: "https://heartfulness.org/en/privacy-policy/",
    },
  ];

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <div className="footer w-100 z-3">
      <div className="container px-4">
        <div className="row pt-5">
          <div className="col-lg-4 d-flex flex-column justify-content-center">
            <Image
              className={`mb-3`}
              // src={footerLogo}
              src={"https://heartfulness-events.s3.ap-south-1.amazonaws.com/HFN_advancing_with_kindness_white_93e9480c3f.png"}
              width={224}
              height={73}
              alt="Logo"
              quality={100}
              loading="lazy"
              loader={imageLoader}
            />
            <div className="mt-4">
              <Link href="https://heartfulness.app.link/appwebsite" target="_blank">
                <Image
                  className="me-4 mb-3"
                  src={
                    footerData?.data?.attributes?.SocialLink[0].Image.data
                      .attributes.url ||
                    "https://cdn-staging-static.heartfulnessmagazine.com/Gplay_8c57b2c477.webp"
                  }
                  width={140}
                  height={48}
                  alt="Logo"
                  quality={100}
                  loading="lazy"
                  loader={imageLoader}
                />
                <Image
                  className="mb-3"
                  src={
                    footerData?.data?.attributes?.SocialLink[1].Image.data
                      .attributes.url ||
                    "https://cdn-staging-static.heartfulnessmagazine.com/Astore_60d0108e7e.webp"
                  }
                  width={140}
                  height={48}
                  alt="Logo"
                  quality={100}
                  loading="lazy"
                  loader={imageLoader}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-8 p-2 footerRightContainer">
            <div className="d-flex footerRight">
              <div className={`me-md-5 footerList mx-2 py-3`}>
                <h3 className="mb-4">{FooterSubmenu1}</h3>
                <ul>
                  {SubMenu1?.map((menu, i) => (
                    <div className="d-flex">
                      <Image
                        width={20}
                        height={20}
                        alt="media"
                        src={menu?.img}
                        loader={imageLoader}
                      />
                      <li key={i} className="mb-3 ps-2">
                        <Link
                          className="listStyle"
                          href={`${menu?.Slug}`}
                          target="_blank"
                        >
                          {menu?.Title}
                        </Link>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
              <div className={`footerList mx-3 py-3`}>
                <h3 className="mb-4">{FooterSubmenu2}</h3>
                <ul>
                  {SubMenu2?.map((menu, i) => (
                    <li key={i} className="mb-3">
                      <Link
                        className="listStyle"
                        href={`${menu?.Slug}`}
                        target="_blank"
                      >
                        {menu?.Title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`footerList mx-3 py-3`}>
                <h3 className="mb-4">{FooterSubmenu3}</h3>
                <ul>
                  {SubMenu3?.map((menu, i) => (
                    <li key={i} className="mb-3">
                      <Link
                        className="listStyle"
                        href={`${menu?.Slug}`}
                        target="_blank"
                      >
                        {menu?.Title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex flex-wrap my-5">
              <p className="pe-4">{Copyright}</p>
              {BottomMenus?.map((item, i) => (
                <p key={i} className="px-3">
                  <Link
                    className="listStyle"
                    href={`${item.Slug}`}
                    target="_blank"
                  >
                    {item.Title}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;