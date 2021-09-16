import React from 'react'

export const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span>Septiembre 6, 2021</span>
      <div>
        <button className="btn notes__appbar-btn">Picture</button>
        <button className="btn notes__appbar-btn">Save</button>
      </div>
    </div>
  )
}
