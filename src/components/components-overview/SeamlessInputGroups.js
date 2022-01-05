import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Button,
  Modal, ModalBody, ModalHeader
} from "shards-react";

class SeamlessInputGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
        tempMin: '',
        tempMax: '',
        aHumiMin: '',
        aHumiMax: '',
        sMoilMin: '',
        sMoilMax: '',
        open: false,
      }
    };
  }
  changeParam = (e, name) => {
    console.log(name, e.target.value);
    const {
      target: { value },
    } = e;
    const { inputValue } = this.state;
    inputValue[name] = value;
    this.setState({
      inputValue,
    });
  }
  saveValue = () => {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <strong className="text-muted d-block mb-2">
          Temperature min (*C)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            type="number"
            onChange={(e) => this.changeParam(e, 'tempMin')}
          />
        </InputGroup>
        <strong className="text-muted d-block mb-2">
          Temperature max (*C)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            onChange={(e) => this.changeParam(e, 'tempMax')}
          />
        </InputGroup>
        <strong className="text-muted d-block mb-2">
          Air Humidity min (%)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            onChange={(e) => this.changeParam(e, 'aHumiMin')}
          />
        </InputGroup>
        <strong className="text-muted d-block mb-2">
          Air Humidity max (%)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            type="number"
            onChange={(e) => this.changeParam(e, 'aHumiMax')}
          />
        </InputGroup>
        <strong className="text-muted d-block mb-2">
          Soil moisture min (%)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            type="number"
            onChange={(e) => this.changeParam(e, 'sMoilMin')}
          />
        </InputGroup>
        <strong className="text-muted d-block mb-2">
          Soil moisture max (%)
        </strong>
        <InputGroup seamless className="mb-3">
          <FormInput
            type="number"
            onChange={(e) => this.changeParam(e, 'sMoilMax')}
          />
        </InputGroup>
        <div style={{ textAlign: "center" }}>
          <Button theme="white" onClick={() => this.saveValue()}>Save</Button>
        </div>
        <Modal open={open} toggle={this.saveValue}>
          <ModalHeader>Notification</ModalHeader>
          <ModalBody>Chức năng đang được cập nhật</ModalBody>
        </Modal>
      </div>
    )
  }
}

export default SeamlessInputGroups;
