import { Outlet } from 'react-router-dom';
import HeaderComponent from '../layouts/ui/HeaderComponent';
import Wrapper from '../layouts/ui/Wrapper';
import FooterComponent from '../layouts/ui/FooterComponent';

const Root = () => {
  return (
    <>
      <header>
        <HeaderComponent />
      </header>
      <Wrapper>
        <main>
          <Outlet />
        </main>
      </Wrapper>
      <FooterComponent />
    </>
  );
};

export default Root;
