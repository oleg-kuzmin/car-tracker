import './styles/index.scss';
import { ToasterComponent } from '@/shared/ui';
import { ReactQuery } from './providers';
import { ReactRouterDom } from './routers';

export function App() {
  return (
    <ReactQuery>
      <ReactRouterDom />
      <ToasterComponent />
    </ReactQuery>
  );
}
