
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import { announcements } from "../../data/announcements";

const AnnouncementsCarousel = () => {
  const announcementSlides = announcements.map((announcement) => (
    <div key={announcement.id} className="relative h-48 sm:h-64 md:h-80">
      <img
        src={announcement.image}
        alt={announcement.title}
        className="w-full h-full object-cover"
      />
      <div className="gradient-overlay"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="font-serif text-xl md:text-2xl font-medium mb-1">
          {announcement.title}
        </h2>
        <p className="text-sm md:text-base mb-2">{announcement.description}</p>
        <Link
          to={announcement.link}
          className="inline-block px-3 py-1.5 bg-mixology-burgundy text-white text-sm rounded-md hover:bg-mixology-burgundy/90 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  ));

  return (
    <section className="mb-8">
      <Carousel items={announcementSlides} />
    </section>
  );
};

export default AnnouncementsCarousel;
