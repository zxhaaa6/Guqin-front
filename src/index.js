import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import routes from './routes';

const container = document.createElement('div');
container.dataset.reactRoot = true;
document.body.appendChild(container);
ReactDOM.render(routes, container);
