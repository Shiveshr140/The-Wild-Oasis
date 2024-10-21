import Heading from "../ui/Heading";
import Row from "../ui/Row";

//// do not use div instead use fragment so that it can direct child of main otherwise it can mess up the styling
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
