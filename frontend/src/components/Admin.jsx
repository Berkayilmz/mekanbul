import Header from "./Header";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import React from "react";
import VenueDataService from "../services/VenueDataService";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Admin() {
  var navigate = useNavigate();
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });
  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });
    try {
      VenueDataService.listAllVenues().then(
        (result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        }
      );
    } catch {
      dispatchVenues({ type: "FETCH_FAILURE" });
    }
  },[]);
  function handleClick(evt, id) {
    
   //Mekan ekle, sil,güncelle düğmelerine basıldığında
   //olacak olaylar buraya yazılacak
   if (evt.target.name === "Sil") {
    console.log("handleClick running");
    // Silme işlemi
    // id değerini kullanarak VenueDataService'ten ilgili mekanı silme işlemini çağırın ve dispatchVenues ile state'i güncelleyin
    VenueDataService.removeVenue(id)
      .then(() => {
        console.log("remove data");
        // Silme başarılı olduğunda, mekanın silindiği bilgisini göstermek için dispatchVenues ile state'i güncelleyin
        dispatchVenues({ type: "REMOVE_VENUE", payload: id });

        window.location.reload();
        
      })
      .catch(() => {
        // Silme başarısız olduğunda, hata durumunu göstermek için dispatchVenues ile state'i güncelleyin
        dispatchVenues({ type: "DELETE_FAILURE" });
        navigate("/admin");
        
      });
      
  } else if (evt.target.name === "Güncelle") {

    return navigate(`/admin/addupdate/venue/${id}`, {
      state: { action: "update" },
    });
    
    
  } else if (evt.target.name === "Mekan Ekle") {
    
    return navigate('/admin/addupdate/venue/new', {
      state: { action: "new" },
    });
  } 

  evt.preventDefault();
  }
  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;
