
import ReactDOM from 'react-dom';
import routes from './router';
import './style/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import './style/custom.css'


const CONTAINER = document.getElementById('root');
ReactDOM.render(routes, CONTAINER);
