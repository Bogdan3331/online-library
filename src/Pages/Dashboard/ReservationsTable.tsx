import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";

interface Reservation {
  id: number;
  knjiga: {
    id: number;
    title: string;
    photo: string;
    authors: { id: number; name: string; surname: string }[];
  };
  bibliotekar0: {
    id: number;
    photoPath: string;
    name: string;
    surname: string;
  } | null;
  status: string;
  action_date: string;
}

const ReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getReservations();

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (response.data?.data) {
        const activeReservations = response.data.data.active;
        setReservations(activeReservations);
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show only the first two reservations
  const displayedReservations = reservations.slice(0, 2);

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="grid-header">Slika</div>
        <div className="grid-header">Ime i Prezime</div>
        <div className="grid-header">Status</div>
        <div className="grid-header">Datum</div>
        <div className="grid-header">Odobri</div>
        {displayedReservations.map((reservation) => (
          <React.Fragment key={reservation.id}>
            <div className="grid-item">
              <img
                src={
                  reservation.knjiga.photo || "https://via.placeholder.com/100"
                }
                alt={reservation.knjiga.title}
                className="book-photo"
              />
            </div>
            <div className="grid-item">
              {reservation.bibliotekar0?.name || "No Name"}{" "}
              {reservation.bibliotekar0?.surname || "No Surname"}
            </div>
            <div className="grid-item">{reservation.status}</div>
            <div className="grid-item">{reservation.action_date}</div>
            <div className="grid-item tick-x">
              <i
                className="bi bi-check-lg"
                style={{ fontSize: "1.2rem", paddingRight: "1rem" }}
              ></i>
              <i className="bi bi-x-lg"></i>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="view-all">
        <a href="/rezervacije">Cijela lista</a>
      </div>
      <style>{`
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}
.grid-header {
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
.grid-item {
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.book-photo {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
}
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .grid-header:nth-child(5),

  .grid-item:nth-child(6n + 5) {
    display: none;
  }
}
.view-all {
  margin-top: 1rem;
}
.view-all a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
.view-all a:hover {
  text-decoration: underline;
}
`}</style>
    </div>
  );
};

export default ReservationsTable;
