import React  from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaSection from './MediaSection';
import UserSection from './UserSection';
import OverallSection from './OverallSection';
import Paper from '@material-ui/core/Paper';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import COLORS from './Colors'

const Background = styled.div`
  overflow: auto; 
  background: ${COLORS.backgroundColor}
  position:'absolute';
  height: 100vh;
  width: 100vw;
`
const divStyle = {
    margin:'1%',
    backgroundColor: 'transparent',
    display:'grid',
    flexDirection:'row',
    alignContent: 'space-around'
  };





export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.handleMediaChange = this.handleMediaChange.bind(this);
      this.state = {
        error: null,
        userIsLoaded: false,
        mediaIsLoaded: false,
        selectedMedia: null,
        items: []
      };

    }


    handleMediaChange(value){
      this.setState({selectedMedia:value})
    }

    componentDidMount() {
    const apiUrlOne = "https://api.instagram.com/v1/users/self?access_token="+this.props.access_token
    const apiURLTwo = "https://api.instagram.com/v1/users/self/media/recent?access_token="+this.props.access_token
    var apiRequest1 = fetch(apiUrlOne).then(res => res.json()).then( (result)=>{
        this.setState({ userIsLoaded: true, userData:result.data});
    }, (error)=>{
        this.setState({
            userIsLoaded: true,
            error
        })
        console.log("Error parsing User Data +"+error)
    })
    var apiRequest2 = fetch(apiURLTwo).then(res => res.json()).then( (result)=>{
        this.setState({ mediaIsLoaded: true, mediaData:result.data});
    }, (error)=>{
        this.setState({
            mediaIsLoaded: true,
            error
        })
        console.log("Error parsing media data +"+error)
    })
    var combinedData = {"request1":{}, "request2":{}};
    Promise.all([apiRequest1,apiRequest2]).then(function(values){
        combinedData["request1"] = values[0];
        combinedData["request2"] = values[1];
        return combinedData
    });
    
    }
  
    render() {
      const { error, userIsLoaded,mediaIsLoaded,userData,mediaData, selectedMedia } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!userIsLoaded || !mediaIsLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <Background>
            <Paper style={divStyle}>
             <Row>
                <Col xs={12} md={12}>
                  <UserSection userData={userData} mediaData={mediaData} handleChange={this.handleMediaChange}></UserSection>
               </Col>
                <Col xs={12} md={12}>
                  <MediaSection mediaData={mediaData} topMedia={selectedMedia} userData={userData}></MediaSection>
                </Col>
               <Col xs={12} md={12}>
               <OverallSection userData={userData} mediaData={mediaData} topMedia={selectedMedia}/>
              </Col>
            </Row>
            </Paper>
          </Background>
        );
      }
    }
  }

