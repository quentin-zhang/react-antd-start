// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
//import AsideResponsiveLayout from './layouts/AsideResponsiveLayout/Layout';
import HeaderAsideResponsiveLayout from './layouts/HeaderAsideResponsiveLayout/Layout';
import BasicNotFound from './components/BasicNotFound';
import Base from './pages/Base';
import AccountList from './pages/AccountList';
import AccountCard from './pages/AccountCard';
import Comment from './pages/Comment';
import RegisterList from './pages/RegisterList';
import RegisterCard from './pages/RegisterCard';
import ApplicationManage from './pages/ApplicationManage';
import RouterRegister from './pages/RouterRegister';
import RouterList from './pages/RouterList';
import CreateAccount from './pages/CreateAccount';
import HomePage from './pages/HomePage';
import CloudPlusEnterprise from './pages/CloudPlusEnterprise';

const routerConfig = [
  {
    path: '/cloudplus',
    layout: HeaderAsideResponsiveLayout,
    page: HomePage,
    children: [
      {
        path: '/index',
        layout: HeaderAsideResponsiveLayout,
        page: HomePage,
      },
      {
        path: '/index/enterprise',
        layout: HeaderAsideResponsiveLayout,
        page: CloudPlusEnterprise,
      }
    ],
  },
  {
    path: '/application',
    layout: HeaderAsideResponsiveLayout,
    page: RegisterList,
    children: [
      {
        path: '/register',
        layout: HeaderAsideResponsiveLayout,
        page: RegisterList,
      },
      {
        path: '/register/addnewapp',
        layout: HeaderAsideResponsiveLayout,
        page: RegisterCard,
      },
      {
        path: '/register/:appid',
        layout: HeaderAsideResponsiveLayout,
        page: RegisterCard,
      },
      {
        path: '/manage',
        layout: HeaderAsideResponsiveLayout,
        page: ApplicationManage,
      }
    ],
  },
  {
    path: '/routermanage',
    layout: HeaderAsideResponsiveLayout,
    page: RouterList,
    children: [
      {
        path: '/see',
        layout: HeaderAsideResponsiveLayout,
        page: RouterList,
      },
      {
        path: '/see/:enterpriseid/:enterprisename',
        layout: HeaderAsideResponsiveLayout,
        page: RouterRegister,
      },
    ],
  },
  {
    path: '/accountmanage',
    layout: HeaderAsideResponsiveLayout,
    page: AccountList,
    children: [
      {
        path: '/create',
        layout: HeaderAsideResponsiveLayout,
        page: CreateAccount,
      },
      {
        path: '/see',
        layout: HeaderAsideResponsiveLayout,
        page: AccountList,
      },
      {
        path: '/see/:userid',
        layout: HeaderAsideResponsiveLayout,
        page: AccountCard,
      },
    ],
  },

  {
    path: '/setting',
    layout: HeaderAsideResponsiveLayout,
    page: Base,
    children: [
      {
        path: '/base/:id',
        layout: HeaderAsideResponsiveLayout,
        page: Base,
      },
      {
        path: '/comment',
        layout: HeaderAsideResponsiveLayout,
        page: Comment,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideResponsiveLayout,
    page: BasicNotFound,
  },
];

export default routerConfig;
