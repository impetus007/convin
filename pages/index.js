import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import style from "../styles/index.module.css"

const index = (props) => {
  const [ismodal, setModal] = useState(false);
  let [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState();
  const [link, setLink] = useState();
  const handlingModal = () => {
    setModal(true);
  };

  const deleteModal = () => {
    setModal(false);
  };

  const card = () => {
    return (
      <>
        <h1>this is card</h1>
      </>
    );
  };

  const showCards = async () => {
    const response = await fetch(
      "https://convin-e7b74-default-rtdb.firebaseio.com/cards.json",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const mydata = await response.json();
    console.log("mydata", mydata);

    let a = [];
    for (const k in mydata) {
      a.push({
        id: k,
        name: mydata[k].name,
        link: mydata[k].addLink,
        category: mydata[k].category,
      });
    }
    console.log(a);
    setData(a);
  };

  async function deleteCard(e) {
    try {
      console.log(e.target.id);
      await fetch(
        `https://convin-e7b74-default-rtdb.firebaseio.com/cards/${e.target.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const editCard = async (e) => {
    console.log(e.target.id);
    setEdit(true);
    setName(e.target.name);
    setLink(e.target.link);
    console.log(name);
    console.log(first)
    try {
      const body = JSON.stringify({
        name: "impetus demon",
        addLink: "https://google.com",
      });
      await fetch(
        `https://convin-e7b74-default-rtdb.firebaseio.com/cards/${e.target.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { }, [data, isEdit]);

  return (
    <div className={style.card_display}>
      {ismodal && (
        <div>
         <Card flag={deleteModal} />
        </div>
      )}
      <div className={style.main_button}>
        <button className={style.add_button} onClick={handlingModal}>Add Card</button>

        <button className={style.add_button} onClick={showCards}>Show Cards</button>
      </div>
      {!ismodal && (
        <div>
          {data.map((e) => {
            return (
              <div key={e.id}>
                <h1>{e.name}</h1>
                <p>{e.category}</p>
                <iframe width="420" height="345" src={`${e.link}`} />
                <div>
                  <button
                    onClick={editCard}
                    id={e.id}
                    name={e.name}
                    link={e.link}
                  >
                    Edit
                  </button>
                </div>
                <button onClick={(e) => deleteCard(e)} id={e.id}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
      {isEdit && (
        <div>
          <input />
        </div>
      )}
    </div>
  );
};

export default index;

// import React from "react";
// import Others from "./components/Other";

// const index = () => {
//   return (
//     <div>
//       <Others />
//     </div>
//   );
// };

// export default index;
