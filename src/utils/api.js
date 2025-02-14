import axios from "axios"

const jwtToken = localStorage.getItem('token');

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_BASE_URL + url)
        return data;
    } catch (error) {
        console.log(error)
        return error
    }
}

//for send data only text feilds
// export const postData = async (url, formFields) => {
//     try {
//         const response = await fetch("http://localhost:4000" + url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formFields), // Serialize the JSON object
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             const errorData = await response.json();
//             return errorData;
//         }
//     } catch (error) {
//         return { error: true, msg: "Network error or server not reachable" };
//     }
// };

export const postData = async (url, formFields) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + url, formFields, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            }
        });

        return response.data; // Axios already parses JSON for you
    } catch (error) {
        // Check if the error has a response from the server
        if (error.response) {
            return error.response.data; // Return the error response from the server
        } else {
            return { error: true, msg: "Network error or server not reachable" };
        }
    }
};

//this is with images and data 
// export const postData = async (url, formData) => {
//     try {
//         const response = await fetch("http://localhost:4000" + url, {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             const errorData = await response.json();
//             return errorData;
//         }
//     } catch (error) {
//         return { error: true, msg: "Network error or server not reachable" };
//     }
// };

export const editData = async (url, updatedData) => {
    const { data } = await axios.put(process.env.REACT_APP_BASE_URL + url, updatedData, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    })
    return data
}

export const deleteData = async (url) => {
    const { data } = await axios.delete(process.env.REACT_APP_BASE_URL + url, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        }
    })
    return data
}


export const deleteImages = async (url) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_BASE_URL + url, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data; // Return the error response from the server
        } else {
            return { success: false, msg: "Network error or server not reachable" };
        }
    }
};