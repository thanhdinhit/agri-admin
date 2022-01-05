import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Table, Tag, Space } from 'antd';
import PageTitle from "../components/common/PageTitle";
import "antd/dist/antd.css";
import axios from 'axios';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    // this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
      items: {},
      dataSource: []
    };

    this.handleChange = this.changeMove.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeMove(val) {
    console.log('Move:', val);
  }

  componentDidMount() {
    // fetch(
    //   "http://103.7.40.93:8001/my-portal/tmt/system/history?page=0&size=10")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({
    //       dataSource: json,
    //     });
    //   })

    // fetch("http://103.7.40.93:8001/my-portal/tmt/system/history?page=0&size=10", {
    //   method: 'GET',
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrer: 'no-referrer',
    //   // body: JSON.stringify(newUserData),
    // }).then(res => res.json())
    //   .then(response => {
    //     this.setState({
    //       dataSource: response,
    //     });
    //     console.log('Success: ', JSON.stringify(response))
    //   }
    //   )
    //   .catch(error => console.error('Error: ', error))
    console.log('aaaa');
    let self = this;
    axios
      .get('http://103.7.40.93:8001/my-portal/tmt/system/history?page=0&size=10')
      .then(function (response) {
        console.log(response);
        self.setState({
          dataSource: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async getData() {
    let response = () => {
      return new Promise(function (resolve, reject) {
        fetch('https://103.7.40.93:8001/my-portal/tmt/system/history?page=0&size=10', {
        }).then(response => {
          resolve(response);
        });
      });
    };
    let responseData = await response();
    this.setState({
      dataSource: responseData,
    });
    console.log(responseData);
  }

  handlePagination = (page) => {
    //This should be called only when pagination changes
    let self = this;
    axios
      .get(`https://103.7.40.93:8001/my-portal/tmt/system/history?page=${0}&size=10`)
      .then(function (response) {
        console.log(response);
        self.setState({
          dataSource: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
    console.log(this.state.dataSource);
    const { dataSource } = this.state;

    const columns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: 'Temperature',
        dataIndex: 'temperature',
        key: 'temperature',
      },
      {
        title: 'Air Humidity',
        dataIndex: 'airHumidity',
        key: 'airHumidity',
      },
      {
        title: 'Ground Moisture',
        dataIndex: 'groundMoisture',
        key: 'groundMoisture',
      },
      {
        title: 'Date - Time',
        dataIndex: 'createdTime',
        key: 'createdTime',
      },
    ];
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Lịch sử dữ liệu" subtitle="" className="text-sm-left" />
        </Row>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            defaultPageSize: 20,
            // showSizeChanger: true,
            // pageSizeOptions: ['10', '20', '30'],
            onChange: this.handlePagination,
          }}
        />
      </Container>
    )
  }
}

export default Tables;
