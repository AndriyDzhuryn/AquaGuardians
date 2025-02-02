import Header from '../Header/Header.jsx';

export default function SharedLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}