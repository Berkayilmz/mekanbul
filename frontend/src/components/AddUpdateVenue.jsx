import React from "react";
import { useParams, useLocation, json } from "react-router-dom";
import AdminButton from "./AdminButton";
import Header from "./Header";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";
function AddUpdateVenue() {
  const { id } = useParams();
  let location = useLocation();
  const [venue, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  React.useEffect(() => {
    if (location.state.action == "update") {
      dispatchVenues({ type: "FETCH_INIT" });
      try {
        VenueDataService.getVenue(id).then((result) => {
          dispatchVenues({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        });
      } catch {
        dispatchVenues({ type: "FETCH_FAILURE" });
      }
    }
  }, [id]);
  const performClick = async (evt) => {
    evt.preventDefault();

    if(evt.target.name==="Güncelle"){
      
      venue.data.name=evt.target.closest('form').name.value;
     
      console.log(venue.data.name);
      try{
        await VenueDataService.updateVenue(id,json);

        dispatchVenues({type:"ADD_VENUE_SUCCES"});
      }catch(error){
        alert("Hata");
      }
    }

    if(evt.target.name==="Ekle"){

      const newMekan={
        name: evt.target.closest('form').name.value,
        address: evt.target.closest('form').address.value,
        foodanddrink: evt.target.closest('form').foodanddrink.value,
        coordinates: evt.target.closest('form').coordinates.value.split(',').map(coord => parseFloat(coord)),
        day1: evt.target.closest('form').day1.value,
        openclose1: evt.target.closest('form').openclose1.value,
        day2: evt.target.closest('form').day2.value,
        openclose2: evt.target.closest('form').openclose2.value,
      }

     
      try{
        
        await VenueDataService.addVenue(newMekan).then(()=>{
          dispatchVenues({type:"ADD_VENUE_SUCCES"});
        })
      }catch(error){
        
        dispatchVenues({type:"ADD_VENUE_FAILURE"});
      }
    }

  };
  return (
    <>
      {location.state.action == "new" ?(
        <Header headerText="Yönetici" motto="Yeni mekan ekleyin!" />
      ) : ( venue.isSuccess ? (
        <Header
          headerText="Yönetici"
          motto={venue.data.name + " mekanını güncelleyin!"}
        />
      ):(
        <Header headerText="Yönetici" />
      )
      )}

      <div className="col-xs-12 col-md-6">
        <form className="form-horizontal" id="addVenue" onSubmit={performClick}>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Ad:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="name"
                defaultValue={venue.data.name ? venue.data.name : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">Adres:</label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="address"
                defaultValue={venue.data.address ? venue.data.address : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              İmkanlar:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="foodanddrink"
                defaultValue={
                  venue.data.foodanddrink ? venue.data.foodanddrink : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Enlem & Boylam:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="coordinates"
                defaultValue={
                  venue.data.coordinates
                    ? venue.data.coordinates[0] +
                      "," +
                      venue.data.coordinates[1]
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day1"
                defaultValue={venue.data.hours ? venue.data.hours[0].days : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-1:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose1"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[0].open + "," + venue.data.hours[0].close
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="day2"
                defaultValue={venue.data.hours ? venue.data.hours[1].days : ""}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış-2:
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                name="openclose2"
                defaultValue={
                  venue.data.hours
                    ? venue.data.hours[1].open + "," + venue.data.hours[1].close
                    : ""
                }
              />
            </div>
          </div>
          {venue.data.name ? (
            <AdminButton name="Güncelle" type="primary" onClick={performClick} />
          ) : (
            <AdminButton name="Ekle" type="primary" onClick={performClick} />
          )}
        </form>
      </div>
    </>
  );
}

export default AddUpdateVenue;
