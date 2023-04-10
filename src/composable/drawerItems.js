export function getDrawerItems() {
  return [
    {
      icon: "inventory",
      label: "Buyurtmalar",
      to: "/orders",
      children: [],
    },
    {
      icon: "category",
      label: "Bo'limlar",
      to: "/category",
      children: [],
    },
    {
      icon: "sell",
      label: "Mahsulotlar",
      to: "/product",
      children: [],
    },

    // {
    //   icon: "settings",
    //   label: "Sozlamalar",
    //   to: "/settings",
    //   children: [],
    // },
    // {
    //   icon: "manage_accounts",
    //   label: "Аккаунт",
    //   to: "/account",
    //   children: [],
    // },
  ];
}
