import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Paper from '@material-ui/core/Paper';



const Section = styled.div`
    height: 100%;
`
const defaultStyle = {
    marginTop: '20px',
    paddingTop: '20px',
    height: '350px',
    textAlign: 'center',
    // eslint-disable-next-line no-template-curly-in-string
    backgroundColor: '#222f3e',
}

const bgImageStyle = {
    width: '350px',
    height: '350px',
    textAlign: 'center',
    backgroundColor: 'transparent'
}

const Box = {
    marginTop: '20px',
}

const profilePictureStyle = {
    textAlign: 'center',
    padding:'20px'
}

const MainImage = styled.img`
    height: 350px;
    max-width: 350px;
    border-radius: 30%;
    textAlign: 'center',
    opacity: 0.5;
`
const H6 = styled.h5`
    color: white;
    text-align: center;
    padding: 0;
    margin: 0;
`
const UL = styled.ul`
    list-style: none;

`
const blockStyle = {
    height: '350px',
    width: '100%',
    backgroundColor:'transparent',
    color:'white',
    fontFamily: 'Roboto'
}

const SPAN = styled.span`
    color:#bcc1cf;
    margin-left: 1%;
`

function ProfileSelected(props){
    const media = props.selectedMedia
    if(media === undefined || media === null){
        return <Paper style={defaultStyle}><H6>Media is not Selected</H6></Paper>
    }
    return <Paper style={bgImageStyle}> <MainImage src={media.images.standard_resolution.url}/> </Paper>
}

function BasicInfo(props){
    const media = props.selectedMedia
    const userData = props.userData
    if(media === undefined || media === null){
        return <p></p>
    }
    console.log(media)
    return <Paper style={defaultStyle}>
         <H6>Statistic</H6>
            <UL>
                <li><SPAN>{media.caption.text.substring(0,12)} </SPAN></li>
                <li>Total Like Count: <SPAN>{media.likes.count}</SPAN> </li>
                <li>Total Comment Count: <SPAN>{media.comments.count} </SPAN></li>
                <li>Filter Applied: <SPAN>{media.filter}</SPAN> </li>
                <li>Type of Post: <SPAN>{media.type.toUpperCase()} </SPAN></li>
                <li>Following Impact Ratio: <SPAN> {((media.likes.count + media.comments.count) / userData.counts.followed_by).toFixed(2) +" %"}</SPAN></li>
             </UL>
        </Paper>
}

function InfoStats(props){
    const media = props.selectedMedia
    const userData = props.userData
    if(media === undefined || media === null){
        return <p></p>
    }
    console.log(media)
    var data = [{"id":"Followers","label":"Followers","value": userData.counts.followed_by,"color":"hsl(146, 70%, 50%)"},{"id":"Likes","label":"Photo Likes","value":media.likes.count,"color": "hsl(45, 70%, 50%)"}, {"id":"Following","label":"People Following","value":userData.counts.follows,"color": "hsl(0, 45%, 50%)"}]
    return <Paper style={blockStyle}>
                <ResponsivePie data={data}
                margin={{top:40,right:80,bottom:80,left:80}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'dark2' }}
                borderWidth={1}
               borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
               radialLabelsSkipAngle={10}
               radialLabelsTextXOffset={6}
               radialLabelsTextColor="white"
               radialLabelsLinkOffset={0}
               radialLabelsLinkDiagonalLength={16}
               radialLabelsLinkHorizontalLength={24}
               radialLabelsLinkStrokeWidth={1}
               radialLabelsLinkColor={{ from: 'color' }}
               slicesLabelsSkipAngle={10}
               slicesLabelsTextColor="black"
               animate={true}
               motionStiffness={90}
               motionDamping={15}
               defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'black',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'followers'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'likes'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'following'
                    },
                    id: 'dots'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: 'white',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: 'black'
                            }
                        }
                    ]
                }
                ]}/>
          </Paper>
}
export default class MediaSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userData: props.userData,
          mediaData: props.mediaData,
          topMedia: props.topMedia
        };
      }

      
      render(){
          return(
            <Section>
            <Row>
            <Col xs={12} md={3} style={profilePictureStyle}>
               <ProfileSelected selectedMedia={this.props.topMedia}/>
            </Col>
            <Col xs={12} md={5} style={Box}>
                <BasicInfo selectedMedia={this.props.topMedia} userData={this.props.userData}/>
            </Col>
                <Col xs={12} md={4} style={Box}>
                    <InfoStats selectedMedia={this.props.topMedia} userData={this.props.userData}/>
                </Col>
            </Row>
            </Section>
          );
      }
}

