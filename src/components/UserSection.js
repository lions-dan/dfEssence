import React from "react";
import styled from "styled-components";
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import Col from "react-bootstrap/Col";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import ExplicitOutlinedIcon from "@material-ui/icons/ExplicitOutlined";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

const Section = styled.div`
  height: 100%;
  background-color: 'transparent';
`;
const followerStyle = {
  height: "80px",
  textAlign: "center",
  marginTop: "40px"
};
const preStyle = {
  color: "white"
};

const profilePictureStyle = {
  textAlign: "center",
  padding: "20px"
};
const Image = styled.img`
  height: 80px;
  border-radius: 30%;
`;
const H6 = styled.h5`
  font-family: "Roboto";
  font-weight: 500;
  color: #bcc1cf;
`;

const imageStyle = {
  boxShadow: "2px 2px 1px grey"
};


function MediaTitle(selectedMedia){
  if(selectedMedia === undefined){
    return "Select Media"
  }else{
    return selectedMedia
  }
}
export default class UserSection extends React.Component {
  constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
    this.state = {
      userData: props.userData,
			mediaData: props.mediaData,
			selectedMedia: ''
    };

	}
	
	handleChange(e){
    this.props.handleChange(this.getObject(e))
  }
  
  getObject(id){
    for (var j = 0; j < this.props.mediaData.length; j++){
      if(this.props.mediaData[j].id === id){
        this.selectedMedia = this.props.mediaData[j].caption.text
        return this.props.mediaData[j]
      }
    }
  }

  render() {
    const dropDownItems = this.props.mediaData.map((image) => ( 
      <Dropdown.Item key={image.id} eventKey={image.id}  onSelect={this.handleChange}> {image.caption.text}</Dropdown.Item>
        ))
    return (
      <Section>
        <Row>
          <Col xs={12} style={profilePictureStyle} md={2}>
            <Image
              style={imageStyle}
              src={this.props.userData.profile_picture}
              roundedCircle
            />
          </Col>
          <Col style={followerStyle} xs={12} md={2}>
            <H6>
              <span style={preStyle}>
                {" "}
                <PermMediaOutlinedIcon/>
                <br /> Media Count <br />{" "}
              </span>
              {this.props.userData.counts.media}
            </H6>
          </Col>
          <Col style={followerStyle} xs={12} md={2}>
            <H6>
              {" "}
              <span style={preStyle}>
                {" "}
                <GroupAddOutlinedIcon />
                <br />
                Following Count <br />{" "}
              </span>
              {this.props.userData.counts.followed_by}
            </H6>
          </Col>
          <Col style={followerStyle} xs={12} md={2}>
            <H6>
              <span style={preStyle}>
                {" "}
                <PeopleOutlineOutlinedIcon />
                <br />
                Followed By <br />{" "}
              </span>{" "}
              {this.props.userData.counts.follows}
            </H6>
          </Col>
          <Col style={followerStyle} xs={12} md={2}>
            <H6>
              <span style={preStyle}>
                {" "}
                <ExplicitOutlinedIcon /> <br /> Essence Ratio <br />{" "}
              </span>{" "}
              {(
                this.props.userData.counts.followed_by /
                this.props.userData.counts.follows
              ).toFixed(2)}
            </H6>
          </Col>
					<Col style={followerStyle} xs={12} md={2}>
            <DropdownButton title={MediaTitle(this.selectedMedia)}>
                {dropDownItems}
            </DropdownButton>
					</Col>
        </Row>
      </Section>
    );
  }
}
