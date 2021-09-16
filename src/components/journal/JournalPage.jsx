import React from 'react';
import { useSelector } from 'react-redux';
import { NotePage } from '../notes/NotePage';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalPage = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>{active ? <NotePage /> : <NothingSelected />}</main>
    </div>
  );
};
