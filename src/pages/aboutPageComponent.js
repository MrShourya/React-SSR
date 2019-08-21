import React from 'react';
import Checkbox from '@tamm/ui-lib-checkbox';
class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showCheckBox: false,
        };
        this.change = this.change.bind(this);
        this.changeCheckBox = this.changeCheckBox.bind(this);
    }



    change() {
        this.setState(prevState => ({
            show: !prevState.show
        }));
    }

    changeCheckBox() {
        this.setState(prevState => ({
            showCheckBox: !prevState.showCheckBox
        }));
    }

    render() {
        return (
            <div>
                <h2>About Us</h2>
                <p>Hello Shourya, Let's switch components </p>
                <button onClick={this.change} > Switch </button>
                {this.state.show ?
                    <p>Yo Yo Honey Singh! </p> : null}
                <Checkbox
                    className="find-filters__open-checkbox"
                    label={"Show details"}
                    checked={this.state.showCheckBox}
                    onChange={this.changeCheckBox}
                />
                {this.state.showCheckBox ?
                    <p>Uncheck the checkbox to hide this!</p>
                    : null}
            </div>
        )
    }
}

export default About;