
import { Link } from "react-router-dom";

const QuickAccess = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="bg-mixology-navy/5 rounded-lg p-6 dark:bg-mixology-navy/20">
        <h2 className="section-title mb-6 text-center">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/browse"
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
          >
            <div className="w-12 h-12 bg-mixology-purple/10 rounded-full flex items-center justify-center mb-2 dark:bg-mixology-purple/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-mixology-purple dark:text-mixology-cream"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Browse Cocktails</span>
          </Link>
          <Link
            to="/bar"
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
          >
            <div className="w-12 h-12 bg-mixology-burgundy/10 rounded-full flex items-center justify-center mb-2 dark:bg-mixology-burgundy/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-mixology-burgundy dark:text-mixology-burgundy"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">My Bar</span>
          </Link>
          <Link
            to="/browse?filter=canMake"
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 dark:bg-green-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">What Can I Make?</span>
          </Link>
          <Link
            to="/favorites"
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-mixology-navy/40 dark:text-white"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2 dark:bg-red-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Favorites</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
