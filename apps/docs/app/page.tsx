import Body from '@/components/body/body';
import { AppStateProvider } from '@/context/AppStateProvider';

function Page() {
  return (
    <AppStateProvider>
      <Body />
    </AppStateProvider>
  );
}

export default Page;
