import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";


function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
      key={i}
      bg="dark"
      text="white"
      className="text-center"
      style={{ margin: "10px" }} 
      >
       <Card.Img variant="top" src={data.countryInfo.flag} />
       <Card.Body>
          <Card.Title>{data.country}</Card.Title> 
          <Card.Title>Cases: {data.cases}</Card.Title>
          <Card.Title>Deaths: {data.deaths}</Card.Title>
          <Card.Title>Recovered: {data.recovered}</Card.Title>
          <Card.Title>Today's Cases: {data.todayCases}</Card.Title>
          <Card.Title>Today's Deaths: {data.todayDeaths}</Card.Title>
          <Card.Title>Active: {data.active}</Card.Title>
          <Card.Title>Critical: {data.critical}</Card.Title>
        </Card.Body> 
      </Card>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Live Stat Tracker</h2>
      <CardDeck>
        <Card bg="dark" text="white" className="text-center" style={{ margin: "10px"}}>
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
       
        <Card bg="danger" text={"white"} className="text-center" style={{ margin: "10px"}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
        
        <Card bg="success" text={"white"} className="text-center" style={{ margin: "10px"}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated: {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control type="text" placeholder="Search for a country (eg. UK, USA, Australia)" onChange={e => setSearchCountries(e.target.value)} />
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;

