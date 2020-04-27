import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

//you can use this as error handler but your setup did not work with it .... need further reading
const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(null, req => {
                this.setState({ error: null })
            }
            )
            axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            }
            )
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} >
                      {  this.state.error.message}
            </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
};

export default withErrorHandler;