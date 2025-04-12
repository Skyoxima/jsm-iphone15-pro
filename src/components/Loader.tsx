import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    //* This Html wrapper ensures that THREE knows that this is an HTML, not a 3D object to render
    <Html wrapperClass="w-full h-full -translate-x-1/2 -translate-y-1/2" className="w-full h-full flex-center bg-zinc-800 rounded-2xl">
      Loading
    </Html>
  );
};
// wrapperClass goes to the outer div that this Html tag generates and the class goes to the inner, which contains the text


export default Loader;