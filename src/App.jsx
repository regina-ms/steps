import React, { useRef, useState } from 'react';
import './App.css';
import moment from 'moment'
import { Form } from './components/Form/Form';
import { Data } from './components/Data/Data';


function App() {
  const [itemsArr, setItemsArr] = useState([]);
  const inputDateRef = useRef(null);
  const inputDistanceRef = useRef(null);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { currentTarget } = e;

    const item = {
      date: currentTarget.date.value,
      distance: currentTarget.distance.value,
    }

    if (itemsArr.length === 0) {
      setItemsArr([item])
    } else {
      itemsArr.forEach((el) => {
        if (el.date === item.date) {
          el.distance = String(Number(el.distance) + Number(item.distance))
          setItemsArr([...itemsArr])
        } else {
          setItemsArr([...itemsArr, item])
        }
      })
    }
    setItemsArr((itemsArr) =>
      itemsArr.sort((a, b) => moment(a.date, 'DD.MM.YYYY').isAfter(moment(b.date, 'DD.MM.YYYY')) ? 1 : -1))
    inputDateRef.current.maskValue = ""
    inputDistanceRef.current.maskValue = ""
  }

  const handlerRemoveClick = (el) => {
    itemsArr.splice(itemsArr.indexOf(el), 1);
    setItemsArr([...itemsArr])
  }

  const handlerEditClick = (el) => {
    handlerRemoveClick(el);
    inputDateRef.current.maskValue = el.date
    inputDistanceRef.current.maskValue = el.distance
  }

  return (
    <div className='steps-container'>
      <Form submit={handlerSubmit} dateRef={inputDateRef} distanceRef={inputDistanceRef} />
      <Data items={itemsArr} remove={handlerRemoveClick} edit={handlerEditClick}/>
    </div>
  );
}

export default App;
