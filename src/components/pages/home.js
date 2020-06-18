import React, { useState, useEffect } from 'react';

const Home = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    const gethome = async () => {
      const response = await fetch("https://ws-product.herokuapp.com/");
      const data = await response.text();
      setHome(data);
    }
    gethome();
  }, []);

  return (
    <React.Fragment>
      <section className="container pt-5">
        <div className="pt-5">
          <h4 className="text-center">{home}</h4>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home;