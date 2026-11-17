const Footer = () => {
  const technologies = ["React", "TypeScript", "SCSS", "Vite"];

  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_top">
          <p>
            © 2026 Rick and Morty Explorer · Developed by{" "}
            <span className="footer_author">Andreas Osnes</span>
          </p>
          <p>
            Powered by{" "}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rick and Morty API
            </a>
          </p>
        </div>
        <div className="footer_tech">
          <span>Built with</span>
          {technologies.map((technology) => (
            <span key={technology} className="tech_badge">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
