import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import {addNewContact} from "../apiCalls";

const CreatePOPUP = () => {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name || !number) {
            alert("Please fill all fields")
        } else {
            const enterData = JSON.stringify({
                name: name,
                mobile_no: number,
                image: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
            })
            addNewContact(enterData, (res) => {
                if (res) {
                    dispatch({type: "ADD_CONTACT", payload: res})
                    history.push("/")
                }
            }, (err) => {
                if (err.status === 400) {
                    alert("Number already exists in the contact list")
                }
            })
        }
    }


    return (
        <div className='create'>
            <h2>Create New Contact</h2>
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
                    <button id='submit' onClick={handleSubmit}>Create Contact</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePOPUP
