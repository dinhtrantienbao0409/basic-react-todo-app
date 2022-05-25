const RenderIf = ({ children, isTrue, isFalse }) => {
  return isTrue ? children : <p>{isFalse}</p>;
};

export default RenderIf;
