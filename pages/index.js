import fetch from 'isomorphic-unfetch';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import InfoSlider from '../components/homepage/InfoSlider';

import CountrySelector from '../components/homepage/CountrySelector';
import BannerOds from '../components/homepage/BannerOds';
import { withTranslation } from '../i18n';
import WelcomeText from '../components/layout/WelcomeText';

const Home = ({ countries }) => (
  <Container className="d-flex flex-column p-0">

    <Col sm={{ span: 8, offset: 2 }} className="flex-grow">
      <InfoSlider />
    </Col>
    <Col className="flex-grow m-0 ">
      <WelcomeText />
      <CountrySelector countries={countries} />
    </Col>

    <Col className="flex-grow d-flex flex-column justify-content-center">
      <BannerOds />
    </Col>
    <style type="text/css">
      {`
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
    
    .flex-grow{
    flex: 1
    }
    `}
    </style>
  </Container>
);

Home.getInitialProps = async ({ pathname: path }) => {
  const res = await fetch(`${process.env.API_URL}/api/countries`);
  const countries = await res.json();

  return {
    namespacesRequired: ['homepage'],
    countries,
    path,
  };
};

export default withTranslation('homepage')(Home);
