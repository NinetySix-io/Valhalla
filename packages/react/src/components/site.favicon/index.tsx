import * as React from 'react';

export const SiteFavicon: React.FC = () => {
  return (
    <React.Fragment>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/apple-touch-icon_zj5zsd.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/favicon-32x32_pbvsqt.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/favicon-16x16_whljqj.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="https://res.cloudinary.com/ninetysix-io/image/upload/v1650834210/NinetySix/Site/safari-pinned-tab_udiyvz.svg"
        color="#000000"
      />
      <meta name="apple-mobile-web-app-title" content="NinetySix" />
      <meta name="application-name" content="NinetySix" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#ffffff" />
    </React.Fragment>
  );
};
