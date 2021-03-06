import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, path }) => (
  <div className={`layout ${path !== '/' ? 'body' : ''}`}>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,700;0,900;1,300&family=Roboto:ital,wght@0,300;0,400;0,700;0,900;1,300&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700;900&display=swap" rel="stylesheet" />
      <link
        href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
        rel="stylesheet"
      />
      <script src="https://kit.fontawesome.com/93f079ed62.js" rel="external" />
    </Head>
    <Header />
    <div className="content">{children}</div>
    <Footer />
    <style jsx>
      {`
      .layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100vh;
        font-family: 'Roboto';
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: inherit;
      }
      h2{
        text-align: center;
      }
    `}
    </style>
    <style>
      {
          `.changeme{
          background-color:#cfff04;
        } `
      }
    </style>
  </div>
);

export default Layout;
