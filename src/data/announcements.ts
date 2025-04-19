
export interface Announcement {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// Placeholder data has been removed as we're now using Supabase database
// This array will be populated with data from the database
  export const announcements: Announcement[] = [
  // Sample structure for reference:
  // {
  //   id: "announcement-id",
  //   title: "Announcement Title",
  //   description: "Announcement description text",
  //   image: "image-url",
  //   link: "/link-path"
  // }
];
