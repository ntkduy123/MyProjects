// export const userSignIn = ({email, password}) => {
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     axios.post('auth/login', {
//         email: email,
//         password: password,
//       }
//     ).then(({data}) => {
//       console.log("userSignIn: ", data);
//       if (data.result) {
//         localStorage.setItem("token", JSON.stringify(data.token.access_token));
//         axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
//         dispatch({type: FETCH_SUCCESS});
//         dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
//       } else {
//         dispatch({type: FETCH_ERROR, payload: data.error});
//       }
//     }).catch(function (error) {
//       dispatch({type: FETCH_ERROR, payload: error.message});
//       console.log("Error****:", error.message);
//     });
//   }
// };
