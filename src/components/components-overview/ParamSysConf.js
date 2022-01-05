import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Button,
    Modal, ModalBody, ModalHeader
} from "shards-react";

class ParamSysConf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: {
                ssid: '',
                pass: '',
                time_send: '',
                greetings_txt: '',
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
                    SSID
                </strong>
                <InputGroup seamless className="mb-3">
                    <FormInput
                        onChange={(e) => this.changeParam(e, 'ssid')}
                    />
                </InputGroup>
                <strong className="text-muted d-block mb-2">
                    Password
                </strong>
                <InputGroup seamless className="mb-3">
                    <FormInput
                        onChange={(e) => this.changeParam(e, 'pass')}
                    />
                </InputGroup>
                <strong className="text-muted d-block mb-2">
                    Time to send data
                </strong>
                <InputGroup seamless className="mb-3">
                    <FormInput
                        type="number"
                        onChange={(e) => this.changeParam(e, 'time_send')}
                    />
                </InputGroup>
                <strong className="text-muted d-block mb-2">
                    Greetings text
                </strong>
                <InputGroup seamless className="mb-3">
                    <FormInput
                        onChange={(e) => this.changeParam(e, 'greetings_txt')}
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

export default ParamSysConf;
