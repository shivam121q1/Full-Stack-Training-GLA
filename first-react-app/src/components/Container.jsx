import Card from "./Card";
const student1 = {
  name: "Shivam",
  rollNo: 1,
  class: "12th",
};
const student2 = {
  name: "student3",
  rollNo: 2,
  class: "12th",
};
const student3 = {
  name: "student3",
  rollNo: 3,
  class: "12th",
};
const student4 = {
  name: "student4",
  rollNo: 4,
  class: "12th",
};

const student5 = {
  name: "student4",
  rollNo: 5,
  class: "12th",
};
const studentData = [student1, student2, student3, student4, student5];

const Container = () => {
  const name = ["shivam", "abhishek", "ujjwal"];
  return (
    <>
      <h1>Cards Rendering</h1>
      {studentData?.map((item,i) => {
     
        return (
          <Card key={i} name={item.name} rollNo={item.rollNo} class={item.class} />
        );
      })}
    </>
  );
};

export default Container;
