import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Hello, {userInfo.name}</h1>
          <p className="text-center mb-4">
            Would you like to update your profile?
          </p>
          <div className="d-flex">
            <LinkContainer to="/update">
              <Button variant="primary" className="text-center">
                Update Profile
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
