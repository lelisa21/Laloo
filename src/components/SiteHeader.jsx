const NAV_ITEMS = [
  ["About", "/about"],
  ["Work", "/projects"],
  ["Experience", "/experience"],
  ["Blogs & Certifications", "/cert-blogs"],
  ["Contact", "/#contact"],
];

export default function SiteHeader({ navigate, theme, onToggleTheme }) {
  const follow = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="/" onClick={follow("/")}>
            lelisa<i>.</i>
          </a>
          <ul>
            {NAV_ITEMS.map(([label, href]) => (
              <li key={label}>
                <a href={href} onClick={follow(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="tg"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            Theme
          </button>
        </nav>
      </div>
    </header>
  );
}
