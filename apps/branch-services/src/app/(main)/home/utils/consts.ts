export enum Services {
  NewRequests = 'درخواست‌های جدید',
  BatchAchHistory = 'تاریخچه درخواست‌ها',
  OperationCartable = 'کارتابل',
  // Cartable = 'درخواست‌های جاری',
}

export const servicesData = [
  {
    title: Services.NewRequests,
    href: '/new-requests',
  },
  {
    title: Services.BatchAchHistory,
    href: '/batch-ach-history',
  },
  // {
  //   title: Services.Cartable,
  //   href: '/cartable',
  // },
];
export const servicesOperationData = [
  {
    title: Services.OperationCartable,
    href: '/operations-department-cartable',
  },
  {
    title: Services.BatchAchHistory,
    href: '/operations-requests-history',
  },
];
