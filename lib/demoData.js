/**
 * Demo data used when backend APIs are unavailable.
 * The UI still renders with realistic values during design-first development.
 */

export const DEMO_DASHBOARD_DATA = {
  stats: {
    totalViews: { value: 12450, trend: '+12.4%' },
    totalBookings: { value: 386, trend: '+8.1%' },
    avgRating: { value: '4.8', trend: '+0.2' },
    revenue: { value: 18420, trend: '+6.9%', isCurrency: true },
  },
  activity: [
    {
      id: 'a1',
      icon: 'calendar',
      title: 'New booking confirmed',
      subtitle: 'Hair Styling - 3:30 PM',
      time: '2m ago',
    },
    {
      id: 'a2',
      icon: 'star',
      title: 'Customer left a review',
      stars: 5,
      starLabel: 'Excellent service',
      time: '14m ago',
    },
    {
      id: 'a3',
      icon: 'tag',
      title: 'Offer campaign published',
      subtitle: 'Weekend Discount - 20% Off',
      time: '1h ago',
    },
    {
      id: 'a4',
      icon: 'eye',
      title: 'Profile reached visibility peak',
      subtitle: 'Top 5 in local search',
      time: '3h ago',
    },
  ],
  performance: {
    profileCompletion: 84,
    responseRate: 92,
  },
};

export function getDemoDashboardData() {
  return DEMO_DASHBOARD_DATA;
}
