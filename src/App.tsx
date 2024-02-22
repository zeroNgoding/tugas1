import { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function App() {
  const [provinces, setProvinces] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [selectedDistric, setSelectedDistric] = useState("");

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetcData();
  }, []);

  const handleProvinceChange = (e: any) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    // Fetch data cities
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      )
      .then((response) => setCities(response.data))
      .catch((error) => console.log(error));
  };

  const handleCityChange = (e: any) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);

    // Fetch data ditrics
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`
      )
      .then((response) => setDistricts(response.data))
      .catch((error) => console.log(error));
  };

  const handleDistricChange = (e: any) => {
    const districId = e.target.value;
    setSelectedDistric(districId);
  };

  return (
    <>
      <Container className="my-5">
        <h1>Data Wilayah Indonesia :</h1>
        <Form>
          <Form.Label>Select Province</Form.Label>
          <Form.Select
            onChange={handleProvinceChange}
            aria-label="Default select example"
            value={selectedProvince}
          >
            <option value="">...</option>
            {provinces.map((province) => (
              <option value={province.id} key={province.id}>
                {province.name}
              </option>
            ))}
          </Form.Select>
          {selectedProvince && (
            <>
              <Form.Label>Select City</Form.Label>
              <Form.Select
                onChange={handleCityChange}
                aria-label="Default select example"
                value={selectedCity}
              >
                <option value="">...</option>
                {cities.map((city) => (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </>
          )}
          {selectedProvince && selectedCity && (
            <>
              <Form.Label>Select Distric</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={selectedDistric}
                onChange={handleDistricChange}
              >
                <option value="">...</option>
                {districts.map((distric) => (
                  <option value={distric.id} key={distric.id}>
                    {distric.name}
                  </option>
                ))}
              </Form.Select>
            </>
          )}
        </Form>
      </Container>
    </>
  );
}

export default App;
