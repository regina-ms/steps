export function Data({ items, remove, edit }) {
    return (
        <div className="data-container">
            <div className='titles'>
                <div className='title'>Дата</div>
                <div className='title'>Пройдено км</div>
                <div className='title'>Действия</div>
            </div>
            <ul className='items-list'>
                {
                    items.map((item) => (
                        <li className='item'>
                            <div className='date'>{item.date}</div>
                            <div className='distance'>{item.distance}</div>
                            <div className='actions'>
                                <span className='edit' onClick={() => edit(item)}>✎</span>
                                <span className='remove' onClick={() => remove(item)}>✘</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}