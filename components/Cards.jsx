import React from "react";
import { useState, useEffect } from "react";

function Cards() {
  const [data, setData] = useState([]);

  const myfunction = async () => {
    const response = await fetch(
      "https://convin-e7b74-default-rtdb.firebaseio.com/cards.json",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const mydata = await response.json();

    for (const k in mydata) {
      data.push({
        id: k,
        name: mydata[k].name,
        link: mydata[k].addLink,
        category: mydata[k].category
      });
    }
  };

  
  useEffect(() => {
    myfunction();
  }, [data]);

  return (
    <div>
      {data.map((e,index)=>{
        return(
            <div key={index}>
                <h2>{e.name}</h2>
                <h2>{e.addLink}</h2>
                <h2>{e.category}</h2>
            </div>
        )
    })}
    </div>
  );
}

export default Cards;
