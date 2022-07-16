import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import {editContact} from "../apiCalls";

const EditPOPUP = () => {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")

    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const contacts = useSelector((state) => state)
    const current = contacts.find(contact => contact._id === id)

    useEffect(() => {
        if (current) {
            setName(current.name)
            setNumber(current.number)
        }
    }, [current])

    const handleSubmit = (e) => {
        e.preventDefault()

        const checkNumber = contacts.find(
            (contact) => contact._id !== id && contact.mobile_no === number
        )

        if (!name || !number) {
            alert("Please fill all fields")
        } else {
            if (checkNumber) {
                alert("Number already exists in the contact list")
            } else {
                const enterData = {
                    name: name,
                    mobile_no: number,
                    image: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"
                }
                editContact(id, enterData, (res) => {
                    if (res) {
                        dispatch({type: "EDIT_CONTACT", payload: res})
                        history.push("/")
                    }
                }, (err) => {console.log(err)})
            }
        }
        
    }

    return (
        <>
        {current ? (
            <div className='create'>
                <h2>Edit Contact {current.name}</h2>
                <form>
                    <div className='firstname'>
                        <label>First Name </label>
                        <input 
                            type="text"
                            placeholder='First Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='number'>
                        <label>Contact Number </label>
                        <input
                            type="text"
                            placeholder='Contact Number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)} 
                        />
                    </div>
                    <div className='buttons'>
                        <Link to='/'>
                            <button id='cancel'>Cancel</button>
                        </Link>
                        <button id='submit' onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        ):(
        <>
            {alert("ID NOT EXIST")}
            {history.push('/')}
        </>
        )}
        </>
    )
}

export default EditPOPUP
