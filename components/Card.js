import React, { useState, useRef } from "react";
import youtubeEmbed from "youtube-embed";
import style from "../styles/card.module.css"

const Card = (props) => {
  const [category,setCategory]=useState();
  const [link,setLink]=useState();
  const [isOther,setOther]=useState();
  const [data, setData] = useState({
    name: "",
    addLink: "",
    category: "",
  });

  let name, value;
  const handleSubmit = async (event) => {
    console.log("submit");
    event.preventDefault();
    props.flag();
    // console.table(data);
    const response = await fetch("https://convin-e7b74-default-rtdb.firebaseio.com/cards.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    //   .then((response) => {
    //      response.json();
    //   })
    //   .then((result) => {
    //     console.log(result, "Result");
    //   })
    //   .catch((error) => {
    //     {
    //       console.log(error, "Error");
    //     }
    //   });
    const mydata = await response.json();
  };

  const handlingData = (event) => {
    name = event.target.name;
    value = event.target.value;
    if (name == "addLink") {
      setData({ ...data, [name]: youtubeEmbed(`${value}`) });
      console.log()
    } else {
      setData({ ...data, [name]: value });
      console.log(category);
      setCategory(event.target.value);
      console.log(category);
    }
  };

  const handlingOther=()=>{
    console.log("i  m clicked");
    setOther(true);
    console.log("i m clicked");
  }

  console.log(data);

  return (
    <form className={style.main_form} onSubmit={handleSubmit}>
      <div className={style.name_input}>
        <label>Enter the Name</label>
        <input

          type="text"
          name="name"
          onChange={handlingData}
          value={data.name}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={style.addLink_input}>
        <label>Enter the Link</label>
        <input
          type="text"
          name="addLink"
          value={data.addLink}
          onChange={handlingData}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={style.category_input}>
        <label>Enter the category</label>
        <input
          type="text"
          name="category"
          value={data.category}
          onChange={handlingData}
          placeholder="Enter category"
          required
        />
      </div>
      <button className={style.card_submit_button}>Submit</button>
    </form>
  );
};

export default Card;
