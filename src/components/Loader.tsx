import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    //* This Html wrapper ensures that THREE knows that this is an HTML, not a 3D object to render
    <Html wrapperClass="w-full h-3/4 -translate-x-1/2 -translate-y-1/2" className="w-full h-full flex-center loader-gradient rounded-xl">
      Loading
    </Html>
    //! Everything below is for testing, hence commented. If using, comment the code above. 
    // <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[80vw] h-[80vh]">
    //   <div className="w-full h-full flex-center loader-gradient border-amber-50 border-2 rounded-2xl">
    //     Loading...
    //   </div>
    // </div>
  );
};
// wrapperClass goes to the outer div that this Html tag generates and the class goes to the inner, which contains the text


export default Loader;