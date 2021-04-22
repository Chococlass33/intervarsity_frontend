import React from 'react';
import Sortable from 'sortablejs';
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

class Movinglist extends React.Component{
    
    constructor(props) {
        super(props);
        this.ids = props.ids;
        this.array = props.ids;
        this.changeids = props.changeids;
        };
    componentDidMount() {
        const test = this;
        var sort = new Sortable(document.getElementById('example'),{
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd: function(/**Event*/evt) {
                test.changeids(sort.toArray());
                console.log(sort.toArray());
            }
        })
        
        test.changeids(sort.toArray());
        
    }






    render(){
        var numbers = this.ids;
        var listItems = numbers.map((number, index) =>
        <li key={index+1} data-id={index+1}><Typography variant='h6'>{number}</Typography><Divider/></li>
        );
        return(
            <Paper>
            <ul id="example">
            {listItems}
            </ul>
            </Paper>
            )

        }

}

export default Movinglist;