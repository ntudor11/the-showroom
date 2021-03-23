import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Container fluid className="App">
        <Row>
          <Col xs={12}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home /> }
              />

              <Route
                exact
                path="/:client/product/:name"
                render={(props: any) => <Product {...props} />}
              />

              <Route
                exact 
                path="/products"
                render={() => <Products />}
              />

              {/* empty route for 404 page */}
              <Route
                exact
                render={() => <NotFound content="Page"/>}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
