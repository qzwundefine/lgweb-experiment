import { useEffect } from "react";

export default (props) => {
  const { config } = props;

  useEffect(() => {
    new WwLogin({
      id: "wx_reg",
      ...config,
    });
  }, []);

  return (
    <div className='w-full flex justify-center items-center'>
      <div id='wx_reg'></div>
    </div>
  );
};
