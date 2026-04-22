import { Link } from "react-router-dom";

function Popup({ close }) {
  return (
    <div className="overlay" onClick={close}>

      <div className="popup" onClick={(e) => e.stopPropagation()}>

        <button className="remove" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
        </button>

        <div className="subpopup">
          <div className="sub2">
            <li><Link to='/' onClick={close}>Home</Link></li>
            <li><Link to='/about' onClick={close}>About</Link></li>
            <li><Link to='/allsandle' onClick={close}>Sandles</Link></li>
            <li><Link to='/allperfume' onClick={close}>Perfumes</Link></li>
            <li><a href="#contact" onClick={close}>Contact</a> </li>
            <div className="line"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Popup;
