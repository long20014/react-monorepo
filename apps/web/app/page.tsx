import Body from '@/components/body/body';
import Header from '@/components/header/header';
import { AppStateProvider } from '@/context/AppStateProvider';
import { add } from '@repo/core/add';

function Page() {
  return (
    <AppStateProvider>
      <Header />
      <Body />
      {/* <div>{add(1, 2)}</div> */}
    </AppStateProvider>
  );
}

export default Page;
