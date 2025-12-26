import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { RestService } from "../api/services.gen";
import LatestArticle from "../components/LatestArticle";
import Motd from "../components/Motd";
import RandomToolCard from "../components/RandomToolCard";

const Home = () => {
  useEffect(() => {
    RestService.restRestCheckRetrieve().catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
  }, []);

  return (
    <Container className="p-4" style={{ maxWidth: 960 }}>
      <Motd />
      <Row className="justify-content-center mb-4">
        {/* Última publicação */}
        <Col className="d-flex mb-3" md={6}>
          <LatestArticle />
        </Col>
        <Col className="d-flex mb-3" md={6}>
          <RandomToolCard />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
