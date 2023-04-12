import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.imagen}>
      <div className={style.contenedor}>
        <div className={style.countryLogo}>
          <div className={style.contenedorLogo}>
            <div>
              <p className={style.country}>PI COUNTRIES</p>
              <p className={style.country}>Federico Masera</p>
            </div>
          </div>

        </div>
        <div className={style.home}>
          <Link to="/countries">
            <button className={style.button}>Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
