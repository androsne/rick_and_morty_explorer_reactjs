import type { Section } from "../types/navigation";

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const navItems: { id: Section; label: string }[] = [
  { id: "characters", label: "Characters" },
  { id: "episodes", label: "Episodes" },
  { id: "locations", label: "Locations" },
  { id: "favourites", label: "Favourites" },
];

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header_container">
        <a
          href="#characters"
          className="logo"
          aria-label="Rick and Morty Explorer home"
          onClick={() => onNavigate("characters")}
        >
          <img src="/img/rick_and_morty.svg" alt="" />
        </a>

        <nav className="navbar" aria-label="Main navigation">
          <ul className="nav_list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav_link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  onClick={() => onNavigate(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
