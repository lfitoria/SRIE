import fetch from "isomorphic-unfetch";
import InfoSlider from "../components/homepage/InfoSlider";
import CountrySelector from "../components/homepage/CountrySelector";
import Header from "./../components/layout/Header";
import BannerOds from "./../components/homepage/BannerOds"
import { Container,Col,Row } from "react-bootstrap";
import { withTranslation } from "../i18n";
import PropTypes from "prop-types";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

const Home = ({ countries, t, pa }) => (
  <>
    <div className="home">
    <h4>{t("homepage.title")}</h4>
      <Header path={pa}/>
        <Row className="justify-content-md-center mxs-0">
          <div className="col-sm-8 px-0">
            <InfoSlider />
            <CountrySelector countries={countries} />
          </div>
        </Row>
    </div>
    <div className="row justify-content-md-center slider-box">
      <div className="col-sm-8">
        <BannerOds/>
      </div>
    </div>
    <style type='text/css'>{`
      .fa-times:before, .fa-bars:before {
        color: white;
      }
      .navbar-light .navbar-toggler {
        color: rgba(0,0,0,.5);
        border: none;
        margin: 9px auto 0 auto;
    }
    .header {
      border-bottom: 2px solid #fff;
      padding-top: 10px;
    }
    `}</style>
    <style jsx>{`
    
    `}</style>
  </>
);

Home.getInitialProps = async function({pathname}) {
  let pa = pathname
  const res = await fetch("http://localhost:3000/api/countries");
  const countries = await res.json();

  return {
    namespacesRequired: ["homepage"],
    countries: countries,
    pa: pa
  };
};

Home.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation("homepage")(Home);
