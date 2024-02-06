export const landingNavItems = (
  user: boolean
) => [
  {
    title: "Home",
    link: "/",
  },
  ...(!user
    ? [
        {
          title: "Products",
          link: "#",
        },
        {
          title: "Works",
          link: "#",
        },
        {
          title: "Pricing",
          link: "#",
        },
        {
          title: "Team",
          link: "#",
        },
      ]
    : []),
];

export const authenticatedNavItems = [
  {
    title: "Templates",
    link: "/templates",
  },
  {
    title: "History",
    link: "/history",
  },
  {
    title: "New Consult",
    link: "/consult",
  },
];
