import React from 'react';
import Checkbox from '@tamm/ui-lib-checkbox';
class DLSComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            recievedProps: JSON.stringify(this.props)
        };
        this.change = this.change.bind(this);
    }

    change() {
        this.setState(prevState => ({
            show: !prevState.show
        }));
    }

    render() {
        return (
            <div>
                <h2>Hello Shourya _/\_ </h2>
                <p>Select  Checkbox below </p>
                <Checkbox
                    className="find-filters__open-checkbox"
                    label={"Show details"}
                    checked={this.state.show}
                    onChange={e =>
                        this.setState(prevState => ({
                            show: !prevState.show
                        }))
                    }
                />
                {this.state.show ?
                    <p>Uncheck the checkbox to hide this!</p>
                    : null}
            </div>
        )
    }
}

export default DLSComponent;