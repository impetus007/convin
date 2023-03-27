import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Cards from "./components/Cards";

const index = (props) => {
  const [ismodal, setModal] = useState(false);
  let [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
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
      "https://convin-e7b74-default-rtdb.firebaseio.com/Entertainment.json",
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
        `https://convin-e7b74-default-rtdb.firebaseio.com/Entertainment/${e.target.id}.json`,
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
    try {
      const body = JSON.stringify({
        name: "impetus demon",
        addLink: "https://google.com",
      });
      await fetch(
        `https://convin-e7b74-default-rtdb.firebaseio.com/Entertainment/${e.target.id}.json`,
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

  useEffect(() => {}, [data, isEdit]);

  return (
    <div>
      {ismodal && (
        <div>
          <Card flag={deleteModal} />
        </div>
      )}
      <button onClick={handlingModal}>Add Card</button>

      <button onClick={showCards}>Show Cards</button>
      {!ismodal && (
        <div>
          {data.map((e) => {
            return (
              <div key={e.id}>
                <h1>{e.name}</h1>
                <iframe width="420" height="345" src={e.addLink} />
                <div>
                  <button onClick={editCard} id={e.id}>
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
    </div>
  );
};

export default index;
