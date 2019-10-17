import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Section = styled.div`
  margin-top: 10%;
  background-color: 'transparent';
`;

const Title = styled.h5`
  color: white
`

const blockStyle = {
    textAlign:'center',
    backgroundColor:'#222f3e'
}
function calculateAverage(mediaArray){
    var total = 0;
    for(var i = 0; i < mediaArray.length; i++){
         total = total + mediaArray[i].likes.count;
    }
    return  total = total/mediaArray.length
}

function mostFrequentComments(mediaArray){
  var countOfPhotos = {}
  for(var i = 0; i < mediaArray.length; i++){
    if(mediaArray[i].users_in_photo.length >= 1){
      const peopleInPhotoArray = mediaArray[i].users_in_photo
      for(var j = 0; j < peopleInPhotoArray.length; j++){
        if(!(peopleInPhotoArray[j].user.username in countOfPhotos)){
          countOfPhotos[peopleInPhotoArray[j].user.username] = 1
        }else if(peopleInPhotoArray[j].user.username in countOfPhotos){
          countOfPhotos[peopleInPhotoArray[j].user.username] = countOfPhotos[peopleInPhotoArray[j].user.username] + 1;
        }
      }
    }
  }
var arr = Object.keys( countOfPhotos ).map(function ( key ) { return countOfPhotos[key]; });
var max = Math.max.apply( null, arr );
var arrayOfNames = []
Object.keys(countOfPhotos).forEach(function(key) {
  if (countOfPhotos[key] === max) {
    arrayOfNames.push(key)
  }
});
  return arrayOfNames
}


export default class OverallSection extends React.Component {
  constructor(props) {
	super(props);
    this.state = {
        userData: props.userData,
	     mediaData: props.mediaData,
        selectedMedia: null,
        topMedia: null,
    };
  }
  render(){
    return (
      <Section>
        {console.log(mostFrequentComments(this.props.mediaData))}
          <Paper style={blockStyle}>
            <Title> Most frequent Commentator(s)</Title>
            <ul> 
            {mostFrequentComments(this.props.mediaData).map((name) => ( 
              <li key={name}>{name}</li>
            ))
            }
            </ul>
            <Title> Average Post Performance </Title>
            <span>{calculateAverage(this.props.mediaData)}</span>
          </Paper>
      </Section>
        );
    } 
}

