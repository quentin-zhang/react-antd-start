# 使用本Ant Design的正确姿势

（1）设置NPM镜像

```bash
    curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

（2）设置Yarn镜像

```bash
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
```

（3）安装Yarn

```bash
    sudo yum install yarn
```

（4）测试yarn

```bash
yarn --version
```

（5）下载本应用程序

```bash
git clone https://github.com/quentin-zhang/react-antd-start
```

（6）安装依赖

```bash
yarn install
```

（7）启动应用程序

```bash
  yarn start
```

（8）打开端口

```bash
  firewall-cmd --zone=public --add-port=3000/tcp --permanent
  firewall-cmd --reload
```

（9）docker 安装(如果需要容器化)

```bash
  cd /opt/githubrepository/react-antd-start/
  docker build -t uservoice:0.0.1 .
  docker run -it --name uservoice -p 3000:3000 uservoice:0.0.1
```