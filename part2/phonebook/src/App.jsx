import React, { useState, useEffect } from 'react';
import axios from 'axios'
import phonebookService from './services/phonebookService';
import Persons from './components/Persons';
import Notification from './components/Notification';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};


const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  //const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);


  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${updatedPerson.name}'s number successfully.`, 'success');
          })
          .catch((error) => {
            console.log('Error updating person:', error);
            if (error.response && error.response.data) {
              showNotification(error.response.data.error, 'error');
            } else {
              showNotification('Failed to update person.', 'error');
            }
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${response.data} successfully.`, 'success');
        })
        .catch((error) => {
          console.log('Error adding person:', error);
          if (error.response && error.response.data) {
            showNotification(error.response.data.error, 'error');
          } else {
            showNotification('Failed to add person.', 'error');
          }
        });
    }
  };
  
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (confirmDelete) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification('Deleted person successfully.', 'success');
        })
        .catch(error => {
          console.log('Error deleting person:', error);
          showNotification('Failed to delete person.', 'error');
        });
    }
  };
  

  const filteredPersons = persons.filter((person) => {
    return person && person.name && person.name.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : '');
  });
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
