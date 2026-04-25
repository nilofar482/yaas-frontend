import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "./popup";
import Footer from "./footer";

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.yaasgents.com/api/search_product/?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setFilteredResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* TOP BAR */}
      <div className={scrolled ? "first hide" : "first"}>
        <div className="first1">Minimal Design, Maximum Impact</div>
      </div>

      <nav
        className={`navbar ${scrolled ? "active" : ""} 
        ${["/allsandle", "/allperfume", "/signup", "/login", "/about","/terms", "/profile", "/kandura"].includes(location.pathname) ||  location.pathname.includes("/product/") ? "text-dark" : ""}
        ${showSearch ? "search-active" : ""}`}
      >
        <div className="navmain">
          <div className="logo"><img src="/logoyaas.png" alt="logo" /></div>

          <div>
            <button onClick={() => setShowPopup(true)} className="list">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>
          </div>

          <div className="logo2"><img src="/logoyaas.png" alt="logo" /></div>

          <div className="navcenter">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="about">About</Link></li>
              <li><Link to="allsandle">Sandles</Link></li>
              <li><Link to="allperfume">Perfumes</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="navend">

            {user ? (
              <div 
                className="nav_profile"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                <div className="nav_icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                  </svg>
                </div>

                {showDropdown && (
                  <div className="profile_dropdown">
                    <Link to="/profile">My Profile</Link>
                    <div onClick={handleLogout}>Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="login">
                <div className="nav_icon" title="Login">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4"/>
                  </svg>
                </div>
              </Link>
            )}

            <div className="nav_icon" onClick={() => setShowSearch(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </div>

          </div>
        </div>
      </nav>


{showSearch && (
  <div className="search-bar">
    <div className="search_cor">

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </form>

      <div className="close-search" onClick={() => setShowSearch(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
      </div>
    </div>

    <div className="search-results">
      {filteredResults.length > 0 ? (
        filteredResults.map((item) => {

          const isPerfume =
            item.category_name?.toLowerCase().trim() === "perfume" ||
            item.category_name?.toLowerCase().trim() === "perfumes";

          return (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => {
                navigate(`/product/${item.id}`);
                setShowSearch(false);
              }}
            >
              <div className="search-result-header">
                {item.name} - AED {item.price}
              </div>

              {/* ✅ PERFUME */}
              {isPerfume && (
                <div className="search-result-color">
                  <img
                    src={
                      item.colors?.length > 0
                        ? `https://api.yaasgents.com${item.colors[0].image1}`
                        : "/no-image.png"   // 👉 fallback image
                    }
                    alt={item.name}
                  />
                </div>
              )}

              {/* ✅ SANDLES */}
              {!isPerfume && (
                <div className="search-result-colors">
                  {item.colors?.map((color) => (
                    <div key={color.id} className="search-result-color">

                      <img
                        src={`https://api.yaasgents.com${color.image1}`}
                        alt={item.name}
                      />

                      <div>
                        <div>{color.color_name}</div>
                        <div>
                          Sizes:{" "}
                          {color.sizes?.map((s) => s.size).join(", ")}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })
      ) : (
        <div className="no-results">No results found</div>
      )}
    </div>
  </div>
)}

      {showPopup && <Popup close={() => setShowPopup(false)} />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;