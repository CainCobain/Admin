import React from 'react';

class UpdateComp extends React.Component {
    constructor(){
        super();
        console.log('this is the updater comp');
//        this.forceUpdate();      
    }
    render(){
        return(
            <div></div>
        )
    }
}

export default UpdateComp;