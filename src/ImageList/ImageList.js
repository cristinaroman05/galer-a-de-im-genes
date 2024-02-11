import React from "react";
import useFetch from "../Hooks/useFetch";
import "../ImageList/ImageList.css";

const API_URL = "https://api.pexels.com/v1/search?query=";
const initialState = {
  favourites: [],
};
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "Add Favourite":
      console.log("state", newState);
      return {
        ...newState,
        favourites: [...newState.favourites, action.payload],
      };
    case "Remove Favorite":
      return {
        ...newState,
        favourites: newState.favourites.filter(
          (image) => image.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
const ImageList = () => {
  const [searchText, setSearchText] = React.useState("");
  const [info] = useFetch(API_URL, searchText); //Este es mi customHook
  const inputRef = React.useRef(null);
  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    setSearchText(inputRef.current.value);
  });
  const sortedList = React.useMemo(() => {
    if (info.photos) {
      return info.photos.sort((a, b) => (a.alt < b.alt ? -1 : 1));
    }
    return undefined;
  }, [info.photos]);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const elementClicked = (element) => {
    console.log("Element clicked", element);
    dispatch({
      type: "Add Favourite",
      payload: element,
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Introduce búsqueda" ref={inputRef} />
      </form>
      <h2>Resultados:</h2>
      <div className="image-container">
        {info.photos &&
          sortedList.map((photo) => {
            return (
              <div
                onClick={() => {
                  console.log("click");
                  elementClicked(photo);
                }}
                key={photo.id}
                className="image-container_info"
              >
                <img className="image" src={photo.src.medium}  />
                <p className="image-container_name">{photo.alt}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Favoritos:</h2>
        <div className="image-container">
          {state.favourites &&
            state.favourites.map((favorite) => {
              return (
                <div key={favorite.id} className="image-container_info">
                  <img src={favorite.src.small} alt={favorite.alt} />
                  <p>{favorite.alt}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ImageList;
