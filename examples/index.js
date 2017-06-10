import ReactDOM from 'react-dom';
import h from 'react-hyperscript';
import { App } from './components/App/App';
import '../src/index.scss';

ReactDOM.render(h(App), document.querySelector('#app'));
