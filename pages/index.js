import Image from 'next/image'
import SiteNav from "./Nav";
import { Container, Row, Col} from 'react-bootstrap';

export default function Homepage() {
  const redstyle = {
    color: '#E60600'
  }

  return (
    <>
        <SiteNav/>
            <div style={{ marginTop: 150 }}>
            <Container fluid>
            <Row>
                <Col sm={8}>
                <h1>Be a Member</h1>
                            <p>
                                As a member-driven organization, we rely on your help and input to progress
                                the ideas of Bitcoin. Join the
                                <b style={redstyle}> Bitcoin Association of Hong Kong </b> today.
                            </p>
                </Col>
                <Col sm={4}>          
                 <Image
                    src="/images/bahk_logo.svg" // Route of the image file
                    height={144} // Desired size with correct aspect ratio
                    width={144} // Desired size with correct aspect ratio
                    alt="Bitcoin HK Logo"
                />
                </Col>
            </Row>
            </Container>
            </div>
        </>
    )
}
