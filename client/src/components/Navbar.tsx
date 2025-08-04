import { Link, NavLink } from "react-router-dom";

const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Links",
    url: "/links",
  },
  {
    title: "About",
    url: "/about",
  },
];

const Navbar = () => {
  return (
    <section className="w-screen h-20 sticky">
      <div className="flex w-full h-full bg-transparent border-b-[1px] border-gray-400">
        {/* Left */}
        <Link to={"/"} className="flex items-center w-1/6 ml-6">
          <img src="/vite.svg" alt="Logo" className="h-3/4" />
          <h1 className="ml-4 text-white text-lg font-bold font-roboto">
            Link Shortener
          </h1>
        </Link>

        {/* Right */}
        <nav className="ml-auto mr-16 w-1/6 h-full">
          <ul className="flex font-bold justify-evenly h-full items-center">
            {navLinks.map((navLink, index) => (
              <NavLink
                to={navLink.url}
                key={index}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black hover:bg-black/40"
                      : "hover:bg-blue-600"
                  } p-2 px-2.5 rounded-lg text-white backdrop-blur-lg text-lg  `
                }
              >
                <li>{navLink.title}</li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
