import { APPLICATION_API_END_POINT }  from"@/helpers/constant"
import { setAllAppliedJobs }  from"@/redux/jobSlice"
import axios from "axios"
// import {  axios }  from "axios"
import { useEffect }  from"react"
import { useDispatch }  from"react-redux"

const useGetAppliedJobs = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAppliedJobs()
  }, [])
}

export default useGetAppliedJobs;


// const { APPLICATION_API_END_POINT } = require("@/helpers/constant")
// const { setAllAppliedJobs } = require("@/redux/jobSlice")
// const { default: axios } = require("axios")
// const { useEffect } = require("react")
// const { useDispatch } = require("react-redux")

// const useGetAppliedJobs = () => {

//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });

//         if (res.data.success) {
//           dispatch(setAllAppliedJobs(res.data.application));
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchAppliedJobs()
//   }, [])
// }

// export default useGetAppliedJobs;