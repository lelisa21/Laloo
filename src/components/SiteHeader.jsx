import portrait from "../assets/portrait.jpg";

const NAV_ITEMS = [
  ["About", "/#about"],
  ["How it works", "/#stack"],
  ["Work", "/projects"],
  ["Design", "/#design"],
  ["Experience", "/#path"],
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
            <img className="av" src={portrait} alt="" width="30" height="30" />
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
