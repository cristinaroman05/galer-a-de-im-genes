import React from "react";

const useFetch = (apiUrl, searchText) => { // Los parámetros que quiero que tenga mi hook
    const [info, setInfo] = React.useState([]); // El array que viene de la API
    const options = {
        headers: {
            'Authorization': "BDBDGqtIul17NF7ml3Pr7mn6bz9bP1lMEJmNvMudijggRpPzcjC70z1L",
        }
    };
    // useEffect para que la API se renderice una sola vez
    React.useEffect(() => {
        if (searchText !== "") {
            fetch(apiUrl + searchText, options)
                .then(response => response.json())
                .then(data => setInfo(data))
                .catch((error) => {
                    console.error('Error fetching the API: ' + error);
                });
                console.log(info)
        } else {
            setInfo([]); // Que sea un array vacío para que la API no me tire el error
        }
    }, [searchText]);
    return [info]
}
export default useFetch;