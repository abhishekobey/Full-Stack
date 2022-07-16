import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {deleteContact, getAllContacts} from "../apiCalls";

const HomeScreen = () => {

    const contacts = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllContacts((res) => {
            if (res) {
                dispatch({type: 'UPDATE_CONTACT', payload: res})
            }
        }, (err) => {console.log(err)})
    }, [])

    const deleteHandler = (id) => {
        deleteContact(id, (res) => {
            if (res) {
                dispatch({type: "DELETE_CONTACT", payload: id})
            }
        }, (err) => {console.log(err)})
    }

    return (
        <>
        <div className='Hscreen'>
            <header>
                <h1>Contact List</h1>
                <Link to='/add'>
                    <button>+</button>
                </Link>
            </header>
            <ul>
                {contacts.map(contact => (
                    <li>
                        <img src={contact.image} alt='not found' />
                        <h4>{contact.name}<p>{contact.mobile_no}</p></h4>
                        <Link to={`/edit/${contact._id}`}>
                            <button id='edit'>Edit</button>
                        </Link>
                        <button id='delete' onClick={() => deleteHandler(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default HomeScreen
