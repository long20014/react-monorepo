import Body from '@/components/body/body';
import Header from '@/components/header/header';
import { AppStateProvider } from '@/context/AppContext';

function Page() {
  return (
    <AppStateProvider>
      <Header />
      <Body />
    </AppStateProvider>
  );
}

export default Page;
