import { IMaskInput } from 'react-imask';

export function Form ({submit, dateRef, distanceRef}) {
  return (
    <form autoComplete='off' onSubmit={submit}>
        <label>
          Дата (ДД.ММ.ГГГГ)
          <IMaskInput
            name='date'
            mask={Date}
            ref={dateRef}
            required
            />
        </label>
        <label>
          Пройдено км
          <IMaskInput
            name='distance'
            mask='0[00].00'
            ref={distanceRef}
            required
          />
        </label>
        <button>ok</button>
      </form>
  )
}