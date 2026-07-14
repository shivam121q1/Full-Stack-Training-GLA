const Card = (props) => {
  return (
    <div style={{ border: "1px solid black" }}>
      Name:{props.name}
      RollNo: {props.rollNo}
      class:{props.class}
    </div>
  );
};

export default Card;
