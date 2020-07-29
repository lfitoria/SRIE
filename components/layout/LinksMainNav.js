import {
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import NavbarLink from './NavbarLink';
import navData from './data/nav-data';

const LinksMainNav = ({ selectectedLanguage, path }) => {
  if (selectectedLanguage === 'es') {
    return navData.es.map((item) => (
      <NavDropdown
        title={item.label}
        id="basic-nav-dropdown"
        className={`${path !== '/' ? 'blue-navbar-item' : ''}`}
        alignRight
        key={item.label}
      >
        {item.items.map((itemNavbar, index) => (
          <NavbarLink item={itemNavbar} />
        ))}
      </NavDropdown>
    ));
  }
  return navData.en.map((item) => (
    <NavDropdown
      title={item.label}
      id="basic-nav-dropdown"
      className={`${path !== '/' ? 'blue-navbar-item' : ''}`}
      alignRight
      key={item.label}
    >
      {item.items.map((itemNavbar, index) => (
        <NavbarLink item={itemNavbar} />
      ))}
    </NavDropdown>
  ));
};

export default LinksMainNav;