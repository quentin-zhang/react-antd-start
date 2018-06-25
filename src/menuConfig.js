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
    name: '云+分析',
    path: '/cloudplus',
    icon: 'home',
    children: [
      {
        name: '概览',
        path: '/cloudplus/index',
      },
      {
        name: '客户端版本情况',
        path: '/cloudplus/index/enterprise',
      },
    ],
  },
  {
    name: 'GS应用分析',
    path: '/routermanage',
    icon: 'fork',
    children: [
      // {
      //   name: '注册路由',
      //   path: '/routermanage/routerregister',
      // },
      {
        name: '企业列表',
        path: '/routermanage/see',
      },
    ],
  },
  {
    name: '移动应用分析',
    path: '/accountmanage',
    icon: 'database',
    children: [
      {
        name: '概览',
        path: '/accountmanage/create',
      },
      {
        name: '企业使用情况',
        path: '/accountmanage/see',
      },
    ],
  },
  {
    name: '用户反馈',
    path: '/setting',
    icon: 'setting',
    children: [
      {
        name: '问题列表',
        path: '/setting/base/111',
        query: {id: "111", name: "lilian", sex: "femail"},
      },
      {
        name: '反馈分布',
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
