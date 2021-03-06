import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Container, Col, Row, Nav,
} from 'react-bootstrap';
import Title from '../layout/Title';
import fetchJson from '../../lib/fetchJson';
import useUser from '../../lib/useUser';
import { withTranslation } from '../../i18n';
import { blue1, yellow } from '../../theme/colors';

const AdminMenu = ({ user, t }) => {
  const { mutateUser } = useUser();
  const router = useRouter();
  return (
    <header className="row admin-menu">
      <Container>
        <Row>
          <Col
            className="text-center text-lg-center text-md-left"
            lg={{
              span: 6,
              offset: 3,
            }}
            md={{
              span: 8,
            }}
          >
            <Title color="white" type="subtitle">{t('administrationPanel')}</Title>
          </Col>
          <Nav className="justify-content-center  col-md-3 col-lg-3 px-0">
            <ul>
              <li>
                <Link href="/admin">
                  <a>{t('options.dashboard')}</a>
                </Link>
              </li>
              {!user?.isLoggedIn && (
                <li>
                  <Link href="/admin/login">
                    <a>{t('options.login')}</a>
                  </Link>
                </li>
              )}
              {user?.isLoggedIn && user?.role === 'admin' && (
                <li>
                  <Link href="/admin/users">
                    <a>{t('options.users')}</a>
                  </Link>
                </li>
              )}
              {user?.isLoggedIn && (
                <>
                  <li>
                    <Link href="/admin/data">
                      <a>{t('options.data')}</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/api/logout"
                      onClick={async (e) => {
                        e.preventDefault();
                        await mutateUser(fetchJson('/api/logout'));
                        router.push('/admin/login');
                      }}
                    >
                      {t('options.logout')}
                    </a>
                  </li>
                </>
                            )}

            </ul>
          </Nav>
        </Row>
      </Container>

      <style jsx>
        {`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
          border-bottom: solid 3px transparent;

        }

        li:first-child {
          margin-left: auto;
        }
        
        li:last-child {
          margin-right: 0;
        }
        
         li:hover {
         border-bottom: solid 3px ${yellow};
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          font-weight: bold;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        .admin-menu{
        background-color: ${blue1};
        }
      `}

      </style>
    </header>
  );
};

AdminMenu.defaultProps = {
  i18nNamespaces: ['admin'],
};

export default withTranslation('admin')(AdminMenu);
