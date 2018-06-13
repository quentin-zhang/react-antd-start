import React from 'react';
import {Layout, Table, Input, Button, Icon} from 'antd';
import {Link} from 'react-router-dom';
import ContentHeader from './../components/ContentHeader';
const {Content} = Layout;
const resultdata = {
  "totalElements": 20,
  "last": true,
  "totalPages": 2,
  "size": 10,
  "number": 1,
  "first": false,
  "numberOfElements": 10,
  "enterprises": [
    {
      "creation_date": 1520932157000,
      "last_update": 1520932157000,
      "state": "ACTIVED",
      "id": 9994,
      "name": "浪潮云+",
      "code": "inspur-cloud-plus",
      "clusters": [
        {
          "cluster_id": "ecm-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com"
        },
        {
          "cluster_id": "emm-v0-inspur-cloud-plus",
          "service_name": "com.inspur.emm",
          "service_version": "v0",
          "base_url": "https://emm.inspur.com"
        },
        {
          "cluster_id": "ecm-bot-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.bot",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/inspur-cloud-plus/api/v0/registry/bot"
        },
        {
          "cluster_id": "ecm-storage-legacy-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.storage.legacy",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/inspur-cloud-plus"
        },
        {
          "cluster_id": "ecm-distribution-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.distribution",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/inspur-cloud-plus/api/v0"
        },
        {
          "cluster_id": "ecm-schedule-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.schedule",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/inspur-cloud-plus"
        },
        {
          "cluster_id": "ecm-cloud-drive-v1.0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.cloud-drive",
          "service_version": "v1.0",
          "base_url": "https://ecm.inspur.com/cloud-drive/api/v1"
        },
        {
          "cluster_id": "ecm-client-registry-v1.0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.client-registry",
          "service_version": "v1.0",
          "base_url": "https://ecm.inspur.com/client-registry/api/v1"
        },
        {
          "cluster_id": "ecm-chat-v0-inspur-cloud-plus",
          "service_name": "com.inspur.ecm.chat",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/inspur-cloud-plus"
        }
      ]
    },
    {
      "creation_date": 1464340157000,
      "last_update": 1484808046358,
      "state": "ACTIVED",
      "id": 9996,
      "name": "CRM产品演示",
      "code": "demo_crm",
      "clusters": [
        {
          "cluster_id": "ecm-bot-v0-demo_crm",
          "service_name": "com.inspur.ecm.bot",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm/api/v0/registry/bot"
        },
        {
          "cluster_id": "ecm-news-v0-demo_crm",
          "service_name": "com.inspur.ecm.news",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm/api/v0"
        },
        {
          "cluster_id": "ecm-storage-legacy-v0-demo_crm",
          "service_name": "com.inspur.ecm.storage.legacy",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm"
        },
        {
          "cluster_id": "ecm-distribution-v0-demo_crm",
          "service_name": "com.inspur.ecm.distribution",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm/api/v0"
        },
        {
          "cluster_id": "ecm-schedule-v0-demo_crm",
          "service_name": "com.inspur.ecm.schedule",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm"
        },
        {
          "cluster_id": "ecm-demo_crm",
          "service_name": "com.inspur.ecm",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com"
        },
        {
          "cluster_id": "emm-demo_crm",
          "service_name": "com.inspur.emm",
          "service_version": "v0",
          "base_url": "https://emm.inspur.com"
        },
        {
          "cluster_id": "ecm-cloud-drive-demo_crm",
          "service_name": "com.inspur.ecm.cloud-drive",
          "service_version": "v1.0",
          "base_url": "https://ecm.inspur.com/cloud-drive/api/v1"
        },
        {
          "cluster_id": "ecm-client-registry-demo_crm",
          "service_name": "com.inspur.ecm.client-registry",
          "service_version": "v1.0",
          "base_url": "https://ecm.inspur.com/client-registry/api/v1"
        },
        {
          "cluster_id": "ecm-chat-v0-demo_crm",
          "service_name": "com.inspur.ecm.chat",
          "service_version": "v0",
          "base_url": "https://ecm.inspur.com/demo_crm"
        }
      ]
    }
  ]
};

export default class RouterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropdownVisible: false,
      data: resultdata.enterprises,
      searchText: '',
      filtered: false,
    };
  }

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: resultdata.enterprises.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
                text.toLowerCase() === searchText.toLowerCase() ?
                  <span key={i} className="highlight">{text}</span> : text // eslint-disable-line
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  expandedRowRender = (record) => {
    const columns = [
      {title: '路由名称', dataIndex: 'service_name', key: 'service_name'},
      {title: '路由版本', dataIndex: 'service_version', key: 'service_version'},
      {title: '路由地址', dataIndex: 'base_url', key: 'base_url'},
    ];
    return (
      <Table
        columns={columns}
        dataSource={record.clusters}
        pagination={false}
      />
    );
  };

  render() {
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>Search</Button>
          </div>
        ),
        filterIcon: <Icon type="search" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: (visible) => {
          this.setState({
            filterDropdownVisible: visible,
          }, () => this.searchInput && this.searchInput.focus());
        },
        render: (text, record) => <Link
          to={this.props.match.url + "/" + record.id + "/" + record.name}>{text}</Link>,
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      }];
    const breadcrumb = [
      {text: '路由管理', link: ''},
      {text: '路由查询管理', link: '#/routermanage/see'},
    ];
    return (
      <Content className="maincontent">
        <ContentHeader datasource={breadcrumb} contenttitle="路由查询管理：" />
        <div className="pagecontent">
          <Table className="components-table-demo-nested" columns={columns} dataSource={this.state.data}
                 expandedRowRender={this.expandedRowRender}/>
        </div>
      </Content>
    );
  }
}
