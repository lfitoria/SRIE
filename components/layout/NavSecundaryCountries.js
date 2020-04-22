import Link from "next/link";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { countries } from "./../../pages/api/countries-data";
import CountryItem from "../homepage/CountryItem";

console.log(countries);

export default class NavSecundaryCountries extends React.Component {
  render() {
    const { path } = this.props;

    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };

    return (
      <>
      <div className="box_linkC">
      <Container>
      <Row>
      <Col sm={5}>
        <p className="p-select text-right">Seleccione otro país que desee consultar:</p>
    </Col>
    <Col sm={7} className="d-flex">
        {
            countries.map(country => {
                return (
                <>
                    
                        
                        
                            <Link
                                href="/country/[countryId]"
                                as={`${country.countryId}`}
                                
                            >
                                <a title={country.title} id={`link_${country.countryId}` } className="linkCountry">
                                {/* backgroundimage: url(); */}
                                {/* <img src={country.img} /> */}
                                <span className="cy-link">{country.title}</span>
                                </a>
                            </Link>
                    
                    
                </>
                )
            })
            }
        </Col>
        </Row>
        </Container>
        <style type="text/css">{`
        .p-select {
            color: #1D2D49;
            line-height: 46px;
            margin: 0;
        }
                .box_linkC {
                    background: #cccccc;
                    padding: 10px 0px;
                }
                a.linkCountry{
                    font-size: 0;
                    width: 45px;
                    display: block;
                    height: 45px;
                    background-size: 100%;
                    margin: 0 5px;
                    border-radius: 50%;
                }
                a.linkCountry:hover{
                    font-size: 0;
                    width: 45px;
                    display: block;
                    height: 45px;
                    background-size: 100%;
                    margin: 0 5px;
                    border-radius: 50%;
                }
                a#link_bh {
                    background-image: url(/img/home/bandera-belice-BN.png);
                }
                a#link_cr {
                    background-image: url(/img/home/bandera-costa_rica-BN.png);
                }
                a#link_es {
                    background-image: url(/img/home/bandera-el_salvador-BN.png);
                }
                a#link_gt {
                    background-image: url(/img/home/bandera-guatemala-BN.png);
                }
                a#link_ho {
                    background-image: url(/img/home/bandera-honduras-BN.png);
                }
                a#link_nu {
                    background-image: url(/img/home/bandera-nicaragua-BN.png);
                }
                a#link_pm {
                    background-image: url(/img/home/bandera-panama-BN.png);
                }
                a#link_dr {
                    background-image: url(/img/home/bandera-rep_dominicana-BN.png);
                }
                a#link_bh:hover {
                    background-image: url(/img/home/bandera-belice.png);
                }
                a#link_cr:hover {
                    background-image: url(/img/home/bandera-costa_rica.png);
                }
                a#link_es:hover {
                    background-image: url(/img/home/bandera-el_salvador.png);
                }
                a#link_gt:hover {
                    background-image: url(/img/home/bandera-guatemala.png);
                }
                a#link_ho:hover {
                    background-image: url(/img/home/bandera-honduras.png);
                }
                a#link_nu:hover {
                    background-image: url(/img/home/bandera-nicaragua.png);
                }
                a#link_pm:hover {
                    background-image: url(/img/home/bandera-panama.png);
                }
                a#link_dr:hover {
                    background-image: url(/img/home/bandera-rep_dominicana.png);
                }
                
            `}</style>
        </div>
      </>
    );
  }
}
// xs={12} sm={2}
