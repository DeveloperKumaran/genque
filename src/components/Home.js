// src/Home.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase';
import './home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [editableRowId, setEditableRowId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(newData);
  };

  const handleFname = (e, id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, fname: e.target.value } : user
    );
    setData(updatedData);
  };

  const handleLname = (e, id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, lname: e.target.value } : user
    );
    setData(updatedData);
  };

  const handleCity = (e, id) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, city: e.target.value } : user
    );
    setData(updatedData);
  };

  const handleRowClick = (id) => {
    setEditableRowId(id);
  };

  const handleSave = async (id) => {
    const userToUpdate = data.find((user) => user.id === id);
    await updateDoc(doc(db, 'users', id), {
      fname: userToUpdate.fname,
      lname: userToUpdate.lname,
      city: userToUpdate.city,
    });
    fetchData(); 

    setEditableRowId(null); 
  };

  const handleCancel = () => {
    setEditableRowId(null); // disable editing without saving
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    fetchData();
  };

  const handleAdd = async () => {
    const newUser = {
      fname: firstName,
      lname: lastName,
      city: city,
    };

    await addDoc(collection(db, 'users'), newUser);
    fetchData();

    
    setData((prevData) => [...prevData, newUser]);

    
    setFirstName('');
    setLastName('');
    setCity('');
  };

  const handleSearch = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const filteredData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const result = filteredData.filter(
      (user) =>
        user.fname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.city.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(result);
  };

  return (
    <div className='container'>

      <h1 className='heading'>CRUD OPERATION USING NODE.JS AND FIREBASE</h1>
      <input className='search'
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className='search-btn' onClick={() => handleSearch()}>Search</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>
                {editableRowId === row.id ? (
                  <input
                    type="text"
                    value={row.fname}
                    onChange={(e) => handleFname(e, row.id)}
                  />
                ) : (
                  <div onClick={() => handleRowClick(row.id)}>{row.fname}</div>
                )}
              </td>
              <td>
                {editableRowId === row.id ? (
                  <input
                    type="text"
                    value={row.lname}
                    onChange={(e) => handleLname(e, row.id)}
                  />
                ) : (
                  <div onClick={() => handleRowClick(row.id)}>{row.lname}</div>
                )}
              </td>
              <td>
                {editableRowId === row.id ? (
                  <input
                    type="text"
                    value={row.city}
                    onChange={(e) => handleCity(e, row.id)}
                  />
                ) : (
                  <div onClick={() => handleRowClick(row.id)}>{row.city}</div>
                )}
              </td>
              <td>
                {editableRowId === row.id ? (
                  <>
                    <button className='save-btn' onClick={() => handleSave(row.id)}>Save</button>
                    <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
                  </>
                ) : null}
                <button className='delete-btn' onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>{data.length + 1}</td>
            <td>
              <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            </td>
            <td>
              <input type="text" onChange={(e) => setLastName(e.target.value)} />
            </td>
            <td>
              <input type="text" onChange={(e) => setCity(e.target.value)} />
            </td>
            <td>
              <button className='add-btn' onClick={handleAdd}>Add User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;























