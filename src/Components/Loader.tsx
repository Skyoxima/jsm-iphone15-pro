import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    //* This Html wrapper ensures that THREE knows that this is an HTML, not a 3D object to render
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">Loading...</div>
      </div>
    </Html>
  );
};

export default Loader;