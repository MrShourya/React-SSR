import React from 'react';

class Home extends React.Component{
print(){
    console.log("Yo Yo Honey Singh");
}

    render(){
        return (
            <div>
                <h2>Home Page</h2>
                <p>Hello Shourya </p>
                <button onClick={()=>{this.print()}} > Print something </button>
            </div>
        )
    }
}

export default Home;