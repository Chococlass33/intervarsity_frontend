import './App.css';
import React from 'react';
import Loginhooks from './components/LoginHooks';
import Logouthooks from './components/LogoutHooks';
import MovingList from './components/MovingList';
import axios from 'axios';
import Drawer from './components/Drawer';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '',token:'',currentDance:''};
    this.addemail = this.addemail.bind(this);
    this.addtoken = this.addtoken.bind(this);
    this.changeids = this.changeids.bind(this);
    this.changeDance = this.changeDance.bind(this);
    this.postDancers = this.postDancers.bind(this);
  }
  addemail(email){
    this.setState({email:email})
  }
  addtoken(token){
    this.setState({token:token})
  }

  async changeids(scores){
    this.setState({scores:scores})
    console.log(this.state.email)
    var url = process.env.REACT_APP_BACKEND_URL + '/setDancers/' + this.state.currentDance ;
    await axios.post(url, {token: this.state.token, vote:scores}).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });;
    console.log("sending change")
  }

  async changeDance(){
    var url = process.env.REACT_APP_BACKEND_URL + '/postCurrent'
    await axios.post(url, this.state.token).then((response) =>
    {
      if(this.state.currentDance !== response.data)
        {
          window.location.reload();
        }
    });
  }

  // async componentDidMount() {
  //   // Get request using axios with async/await
  //   var url = process.env.REACT_APP_BACKEND_URL + '/getDancers';
  //   const response = await axios.get(url).then((response) =>
  //   {
  //     if (response){
  //       this.setState({ 
  //         ids: response.data.dancers[0],
  //         currentDance:response.data.currentDance});
  //       console.log(this.state.ids);
  //       console.log(this.state.currentDance);
  //       setInterval(this.changeDance, 30000);
  //     }
  //   });
  // }

  async postDancers() {
    // Get request using axios with async/await
    var url = process.env.REACT_APP_BACKEND_URL + '/postDancers';
    var data = this.state.token;
    await axios.post(url,data).then((response) =>
    {
      if (response != null){
        if(response.data.dancers != null){
          this.setState({ 
            ids: response.data.dancers[0],
            currentDance:response.data.currentDance});
          console.log(this.state.ids);
          console.log(this.state.currentDance);
          setInterval(this.changeDance, 15000);
        }
      }
    });
  }

  // async componentDidUpdate(){
  //       // Get request using axios with async/await
  //       var url = process.env.REACT_APP_BACKEND_URL + '/postDancers';
  //       var data = {token: this.state.token};
  //       const response = await axios.post(url,data).then((response) =>
  //       {
  //         if (response != null){
  //           this.setState({ 
  //             ids: response.data.dancers[0],
  //             currentDance:response.data.currentDance});
  //           console.log(this.state.ids);
  //           console.log(this.state.currentDance);
  //           setInterval(this.changeDance, 15000);
  //         }
  //       });
  // }
  
  render(){
    
    let movinglist;
    if (this.state.ids && this.state.email)
    {
      movinglist = <MovingList ids={this.state.ids} changeids={this.changeids}/>
    }
    return (
      <React.Fragment>
        <CssBaseline />
          <div className="App">
            <header className="App-header">
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <Drawer>
              <Typography variant='h6'>
              {this.state.email === '' ? 'Logged Out': 'Logged in as: ' + this.state.email}
              </Typography>
              <Loginhooks addemail={this.addemail} addtoken={this.addtoken} postDancers={this.postDancers}/>
              <Logouthooks addemail={this.addemail} addtoken={this.addtoken} />
              </Drawer>


              <div style={{ padding: 8 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper>
                      <Typography variant='h6'>
                        {this.state.currentDance === '' ? '': 'Current Dance:\n' + this.state.currentDance}
                      </Typography> 
                      <Typography variant='h6'>
                        {this.state.email === '' ? 'Please log in to begin': ''}
                        {this.state.email !== '' && this.state.currentDance === '' ? 'Please ensure you are logged in as the correct judge account.': ''}
                      </Typography>
                    </Paper>
                  </Grid>
                

                  <Grid item xs={12}>
                  <Box width="75%">
                  {this.state.email ==='' ? '': movinglist}
                  </Box>
                  </Grid>
                </Grid>
              </div>
            </header>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
