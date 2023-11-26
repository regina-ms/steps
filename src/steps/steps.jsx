import React, { useRef, useState } from 'react'
import { IMaskInput } from 'react-imask';
import moment from 'moment'

export default function Steps() {
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
          el.distance = Number(el.distance) + Number(item.distance)
          setItemsArr([...itemsArr])
        } else {
          setItemsArr([...itemsArr, item])
        }
      })
    }
    setItemsArr((itemsArr) =>
      itemsArr.sort((a, b) => moment(a.date, 'DD.MM.YYYY').isAfter(moment(b.date, 'DD.MM.YYYY')) ? 1 : -1)
    )

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
      <form autoComplete='off' onSubmit={handlerSubmit}>
        <label>
          Дата (ДД.ММ.ГГГГ)
          <IMaskInput
            name='date'
            mask={Date}
            ref={inputDateRef}
            required
            />
        </label>
        <label>
          Пройдено км
          <IMaskInput
            name='distance'
            mask='0[00].00'
            ref={inputDistanceRef}
            required
          />
        </label>
        <button>ok</button>
      </form>
      <div className='titles'>
        <div className='title'>Дата</div>
        <div className='title'>Пройдено км</div>
        <div className='title'>Действия</div>
      </div>
      <ul className='items-list'>
        {
          itemsArr.map((item, index) => (
          <Step 
          item={item} 
          key={index} 
          remove={handlerRemoveClick}
          edit={handlerEditClick}
          />
          ))
        }
      </ul>
    </div>
  )
}

function Step({ item, remove, edit }) {
  return (
    <li className='item'>
      <div className='date'>{item.date}</div>
      <div className='distance'>{item.distance}</div>
      <div className='actions'>
        <span className='edit'onClick={()=> edit(item)}>✎</span>
        <span className='remove' onClick={() => remove(item)}>✘</span>
      </div>
    </li>
  )
}
