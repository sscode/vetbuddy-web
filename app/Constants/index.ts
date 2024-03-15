export const landingNavItems = (user: boolean) => [
  ...(user
    ? [
        {
          title: "Home",
          link: "/",
        },
      ]
    : []),
  // ...(!user
  //   ? [
  //       {
  //         title: "Home",
  //         link: "/",
  //       },
  //       {
  //         title: "Products",
  //         link: "#",
  //       },
  //       {
  //         title: "Works",
  //         link: "#",
  //       },
  //       {
  //         title: "Pricing",
  //         link: "#",
  //       },
  //       {
  //         title: "Team",
  //         link: "#",
  //       },
  //     ]
  //   : [
  //       {
  //         title: "Home",
  //         link: "/",
  //       },
  //     ]),
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
