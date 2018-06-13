import React from 'react';
import Breadercrum from './Breadercrum';


export default class ContentHeader extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="pageheader">
        <Breadercrum datasource={this.props.datasource}/>
        <div className="contentheader">{this.props.contenttitle}</div>
      </div>
    );
  }
}
