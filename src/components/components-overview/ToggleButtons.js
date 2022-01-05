import React from "react";
import { Col, FormCheckbox, Row } from "shards-react";
import { decode_encode_string } from '../func-helper/funcHelper';
import { database } from "../../database/firebase";

class ToggleButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPump: true,
      checkedMode: true,
      checked: false,
      getValControl: '',
      checkedMisting: true,
    }
  }

  getDataFirebase = (path, state) => {
    database.ref(`/${path}`).on('value', (snapshot) => {
      switch (state) {
        case 'getValControl':
          return (
            this.setState({
              getValControl: snapshot.val(),
            })
          )
      }
    });
  }

  componentDidMount() {
    this.getDataFirebase('control-code', 'getValControl');
  }

  handleChangeMode = () => {
    let code = "*m0#m*c1#c*1e0#1e*2e30#2e*3e90#3e*p0#p";
    const { getValControl } = this.state;
    console.log(getValControl);
    this.setState({
      checkedMode: !this.state.checkedMode
    });
    let mode = decode_encode_string(getValControl, "mode", this.state.checkedMode ? 0 : 1);
    database.ref("control-code").set(mode);
    console.log(mode);
  }

  handleChangePump = () => {
    let code = "*m0#m*c1#c*1e0#1e*2e30#2e*3e90#3e*p0#p";
    const { getValControl } = this.state;
    console.log(getValControl);
    this.setState({
      checkedPump: !this.state.checkedPump
    });
    let pump = decode_encode_string(getValControl, "pump", this.state.checkedPump ? 0 : 1);
    database.ref("control-code").set(pump);
    console.log(pump);
  }

  handleChangeMisting = ()=>{
    this.setState({
      checkedMisting: !this.state.checkedMisting
    });
  }

  render() {
    const { hideLogoText } = this.props;
    const { checkedMode, checkedPump, checkedMisting } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <strong className="text-muted d-block mb-2">Mode</strong>
            <fieldset>
              <FormCheckbox
                toggle
                small
                disabled={true}
                checked={checkedMode}
                onChange={this.handleChangeMode}>
                <span>{checkedMode ? <span style={{ color: 'blue' }}>ON</span> : <span style={{ color: 'red' }}>OFF</span>}</span>
              </FormCheckbox>
            </fieldset>
          </Col>
          <Col >
            <strong className="text-muted d-block mb-2">Pump</strong>
            <fieldset>
              <FormCheckbox
                toggle
                small
                checked={checkedPump}
                onChange={this.handleChangePump}>
                <span>{checkedPump ? <span style={{ color: 'blue' }}>ON</span> : <span style={{ color: 'red' }}>OFF</span>}</span>
              </FormCheckbox>
            </fieldset>
          </Col>
          <Col >
            <strong className="text-muted d-block mb-2">Misting</strong>
            <fieldset>
              <FormCheckbox
                toggle
                small
                checked={checkedMisting}
                onChange={this.handleChangeMisting}>
                <span>{checkedMisting ? <span style={{ color: 'blue' }}>ON</span> : <span style={{ color: 'red' }}>OFF</span>}</span>
              </FormCheckbox>
            </fieldset>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ToggleButtons;
