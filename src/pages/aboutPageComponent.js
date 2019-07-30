import React from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
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
                <h2>About Us</h2>
                <p>Hello Shourya, Let's switch components </p>
                <button onClick={this.change} > Switch </button>
                {this.state.show ?
                    <p>Yo Yo Honey Singh! </p> : null}
            </div>
        )
    }
}

export default About;