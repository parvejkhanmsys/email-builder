// components/Layout.js
import { useRouter } from 'next/router';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  const router = useRouter();
  const isEditorPage = router.pathname.includes('/email-editor');

  return (
    <>
      {isEditorPage ? null : <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
