import React from "react";
import { useParams, useLocation, useNavigate, json } from "react-router-dom";
import AdminButton from "./AdminButton";
import Header from "./Header";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";
import Venue from "./Venue";
function AddUpdateVenue() {
  const { id } = useParams();
  var navigate = useNavigate();
  let location = useLocation();
  const [venue, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isvenueError:false,
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
  },[id]);

    

  const onSubmit = (evt) => {
    const formData = evt.target.elements;
    evt.preventDefault();
    // ... diğer kodlar ...
    if(location.state.action=="new"){
    if (
      formData.name.value &&
      formData.address.value &&
      formData.foodanddrink.value &&
      formData.coordinates.value &&
      formData.day1.value &&
      formData.openclose1.value &&
      formData.day2.value &&
      formData.openclose2.value
    ) {
      var newVenue = {
        name: formData.name.value,
        address: formData.address.value,
        foodanddrink: formData.foodanddrink.value,
        lat: formData.coordinates ? formData.coordinates.value.split(',')[0] : '',
        long: formData.coordinates ? formData.coordinates.value.split(',')[1] : '',
        day1: formData.day1.value,
        open1: formData.openclose1 ? formData.openclose1.value.split(',')[0] : '',
        close1: formData.openclose1 ? formData.openclose1.value.split(',')[1] : '',
        day2: formData.day2.value,
        open2: formData.openclose2 ? formData.openclose2.value.split(',')[0] : '',
        close2: formData.openclose2 ? formData.openclose2.value.split(',')[1] : '',
      };
      console.log(newVenue)
      VenueDataService.addVenue(newVenue).then(() => {
        dispatchVenues({ type: "ADD_VENUE_SUCCESS" });
        navigate(`/admin`);
       
      });
    } else {
      dispatchVenues({ type: "VENUE_FAILURE" });
      alert("Lütfen Bütün Alanları Doldurun!");
      navigate(`/admin`);
    }
    
  }
  
  else if(location.state.action=="update"){
    
    if (
      formData.name.value &&
      formData.address.value &&
      formData.foodanddrink.value &&
      formData.coordinates.value &&
      formData.day1.value &&
      formData.openclose1.value &&
      formData.day2.value &&
      formData.openclose2.value
    ) {
      var updateVenue = {
        name: formData.name.value,
        address: formData.address.value,
        foodanddrink: formData.foodanddrink.value,
        lat: formData.coordinates ? formData.coordinates.value.split(',')[0] : '',
        long: formData.coordinates ? formData.coordinates.value.split(',')[1] : '',
        day1: formData.day1.value,
        open1: formData.openclose1 ? formData.openclose1.value.split(',')[0] : '',
        close1: formData.openclose1 ? formData.openclose1.value.split(',')[1] : '',
        day2: formData.day2.value,
        open2: formData.openclose2 ? formData.openclose2.value.split(',')[0] : '',
        close2: formData.openclose2 ? formData.openclose2.value.split(',')[1] : '',
      };
      console.log(updateVenue)
      VenueDataService.updateVenue(id,updateVenue).then(() => {
        dispatchVenues({ type: "UPDATE_VENUE_SUCCESS" });
        navigate(`/admin`);
      });
    } else {
      dispatchVenues({ type: "VENUE_FAILURE" });
      alert("Lütfen Bütün Alanları Doldurun!");
      navigate(`/admin`);
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
      ) }
      {venue.isvenueError &&(
        <>
        <div className="error-header">
          {" "}
          <b>Tüm Alanlar zorunldur</b>
        </div>
        </>
      ) }

      <div className="col-xs-12 col-md-6">
        <form className="form-horizontal" id="addVenue" onSubmit={(evt) => onSubmit(evt)}>
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
            <AdminButton name="Güncelle" type="primary"  />
          ) : (
            <AdminButton name="Ekle" type="primary" />
          )}
        </form>
      </div>
    </>
  );
}

export default AddUpdateVenue;