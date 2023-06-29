import { Outlet } from 'react-router-dom';
import HeaderComponent from '../layouts/ui/HeaderComponent';
import Wrapper from '../layouts/ui/Wrapper';
import FooterComponent from '../layouts/ui/FooterComponent';
import MessageComponent from '../components/MessageComponent';
import TopComponent from '../layouts/ui/TopComponent';

const Root = () => {
  return (
    <>
      <header>
        <TopComponent />
        <HeaderComponent />
      </header>
      <Wrapper>
        <main>
          <Outlet />
          <MessageComponent />
        </main>
      </Wrapper>
      <FooterComponent />
    </>
  );
};

export default Root;
