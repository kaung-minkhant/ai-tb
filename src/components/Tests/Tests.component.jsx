import { useEffect, useRef, useState } from "react"
import { useGetPingQuery } from "../../redux/Api/aiTbApi.slice"
// import { useGetPostsQuery } from "../../redux/Api/apiSlice.slice"
import Camera from "./Video"

const Tests = () => {
  const [cameraEl, setCameraEl] = useState(new Camera )

  // camera.startCamera()
  // const {
  //   data: posts,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetPostsQuery()
  // const {
  //   data: response,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetPingQuery()


  useEffect(() => {
    cameraEl.startCamera(320, 320)
  }, [])

  const stopVideo = () => {
    cameraEl.takeSnapshot()
  }

  // if (isLoading) {
  //   return (
  //     <div>
  //       Loading....
  //     </div>
  //   )
  // }

  // if (isError) {
  //   return (
  //     <div>
  //       Error: {error.status}
  //     </div>
  //   )
  // }

  // console.log(response)
  // const postItems = posts?.map(post => {
  //   return (
  //     <div key={post.id}>
  //       <h3>{ post.title }</h3>
  //       <p>{ post.body }</p>
  //     </div>
  //   )
  // })
  return (
    <div style={{
    }}>
      <div id='video-container'></div>
      <button onClick={stopVideo}>Capture</button>
    </div>
  )
}

export default Tests
