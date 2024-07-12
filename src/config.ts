export type MenuItem = {
  title: string;
  href: string;
};

export type Config = {
  mainNav: MenuItem[];
  links: {
    github: string;
  };
};

export const config: Config = {
  links: {
    github: "https://github.com/juliencrn/framer-motion-experiments",
  },
  mainNav: [
    {
      title: "Modal",
      href: "/modal",
    },
    {
      title: "SVG Path",
      href: "/svg-path",
    },
    {
      title: "Email Client",
      href: "/email-client",
    },
    {
      title: "Scroll Header",
      href: "/scroll-header",
    },
    {
      title: "Carousel",
      href: "/carousel",
    },
    {
      title: "Resizable",
      href: "/resizable",
    },
  ],
};
