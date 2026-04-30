export default function Navbar() {
  return (
    <nav>
      <a className="nav-logo" href="#">Evan</a>
      <ul className="nav-menu">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li>
          <a className="nav-btn" href="#footer">
            Get in touch
            <span className="nav-btn-arrow">→</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
