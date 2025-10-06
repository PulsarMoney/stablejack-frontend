export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Stable Jack",
  description: "DeFi yield aggregator platform with friendly, approachable design.",
  navItems: [
    {
      label: "Markets",
      href: "/",
    },
    {
      label: "JACK",
      href: "/jack",
    },
  ],
  navMenuItems: [
    {
      label: "Markets",
      href: "/",
    },
    {
      label: "Stake",
      href: "/jack/stake",
    },
    {
      label: "Bridge",
      href: "/jack/bridge",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
  links: {
    github: "https://github.com/stablejack",
    twitter: "https://twitter.com/stablejack",
    docs: "https://docs.stablejack.com",
    discord: "https://discord.gg/stablejack",
    sponsor: "https://github.com/sponsors/stablejack",
  },
};
