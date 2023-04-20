import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counterSlice'

import { getAllShoes, getOneShoe } from '../../store/shoeSlice'
import { restoreUser } from '../../store/session'


export default function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()



  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Get all SHoes"
          onClick={() => dispatch(getAllShoes())}
        >
          All SHoes
        </button>
        <button
          aria-label="Get One shoe"
          onClick={() => dispatch(getOneShoe(1))}
        >
          Single Shoe
        </button>
      </div>
        <button
          aria-label="Get One shoe"
          onClick={() => dispatch(getOneShoe(1))}
        >
          Single Shoe
        </button>

        <button
          aria-label="Get One shoe"
          onClick={() => dispatch(restoreUser())}
        >
          Restore User
        </button>



    </div>
  )
}
