import React from 'react';
import Alert from 'react-bootstrap/Alert'

class AlertMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        if (this.props.show) {
        return (
            <Alert id="alert" variant={this.props.variant}>
                <Alert.Heading>{this.props.message}</Alert.Heading>
            </Alert>
        );
        } else {
            return null
        }
    }
}
export default AlertMessage;