// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'mail',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'question',
  },
];

const customAsideNavs = [
  {
    name: '应用接入',
    path: '/application',
    icon: 'home',
    children: [
      {
        name: '申请接入',
        path: '/application/register',
      },
      {
        name: '应用管理',
        path: '/application/manage',
      },
    ],
  },
  {
    name: '路由管理',
    path: '/routermanage',
    icon: 'fork',
    children: [
      // {
      //   name: '注册路由',
      //   path: '/routermanage/routerregister',
      // },
      {
        name: '路由查询管理',
        path: '/routermanage/see',
      },
    ],
  },
  {
    name: '账户管理',
    path: '/accountmanage',
    icon: 'database',
    children: [
      {
        name: '创建账户',
        path: '/accountmanage/create',
      },
      {
        name: '账户查看',
        path: '/accountmanage/see',
      },
    ],
  },
  {
    name: '系统设置',
    path: '/setting',
    icon: 'setting',
    children: [
      {
        name: '基本设置',
        path: '/setting/base/111',
        query: {id: "111", name: "lilian", sex: "femail"},
      },
      {
        name: '评论设置',
        path: '/setting/comment',
      },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
