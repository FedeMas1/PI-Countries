import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { countryById } from "../../Redux/actions";
import styles from "./Details.module.css";
import loading from "./logoHome.jpg";
import { Link } from "react-router-dom";

function Details() {
  const { detail } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countryById(id));
  }, [dispatch, id]);

  return (
    <div>
      <header className={styles.header}>
        <Link to="/countries">
          <button className={styles.volver}>Home</button>
        </Link>
        <div>Datos del pais</div>
      </header>
      {detail.name ? (
        <>
          <section className={styles.contenedor}>
            <img src={detail.flags} className={styles.imagen} alt="flags" />
            <div className={styles.detalles}>
              <h1>{detail.name}</h1>
              <p>ID: {detail.id}</p>
              <p>CAPITAL: {detail.capital}</p>
              <p>POPULATION: {detail.population}</p>
              <p>AREA: {detail.area}</p>
              <p>SUB-REGION: {detail.subregion}</p>
            </div>
          </section>
          <section className={styles.activity}>
            {detail.activities?.map((actividad) => {
              return (
                <article key={Math.random().toString(36).substr(2, 9)}>
                  <div className={styles.boxActivity}>
                    <h3>Activity</h3>
                    <p>Name: {actividad.name}</p>
                    <p>Difficulty: {actividad.difficulty}</p>
                    <p>Season: {actividad.season}</p>
                    <p>Duration: {actividad.duration}</p>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      ) : (
        <div className={styles.loading}>
          <img src={loading} className={styles.imagenLoading} />
        </div>
      )}
    </div>
  );
}

export default Details;
