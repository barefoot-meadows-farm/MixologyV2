
export interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export const announcements: Announcement[] = [
  {
    id: "summer-cocktails",
    title: "Summer Cocktail Collection",
    description: "Discover refreshing cocktails perfect for hot summer days.",
    image: "https://images.unsplash.com/photo-1609951651556-5334e61427f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    link: "/browse?collection=summer"
  },
  {
    id: "mixology-tips",
    title: "Essential Mixology Tips",
    description: "Level up your bartending skills with these professional tips.",
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    link: "/tips"
  },
  {
    id: "new-recipes",
    title: "New Cocktail Recipes",
    description: "Explore our latest additions to the cocktail collection.",
    image: "https://images.unsplash.com/photo-1551734322-f25bcb369abb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    link: "/browse?sort=newest"
  }
];
