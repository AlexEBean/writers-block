import React, {useState, useEffect} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import "./Reset.css"
import "../Login.css"

const Reset = (props) => {
    const [password, setPassword] = useState("")
    const [newUser, setNewUser] = useState()
    const [toggle, setToggle] = useState(true)
    const [passCheck, setPassCheck] = useState("")
    const [filledOut, setFilledOut] = useState(false)
    const [passMatch, setPassMatch] = useState(false)

    
    useEffect(() => {
        if (password === passCheck) {
            setPassMatch(true)
        } else {
            setPassMatch(false)
        }
        if (password && passCheck) {
            setFilledOut(true)
        } else {
            setFilledOut(false)
        }

    }, [password, passCheck, passMatch])

    const resetPassword = async () => {
        if (!filledOut){
            alert("Please fill out all fields.")
        } else if (!passMatch){
            alert("Your passwords do not match.")
        } else {
            const updatedUser = await axios.put(`/resetpassword/${props.match.params.resetid}`, {password});
            setNewUser(updatedUser.data[0])
            setToggle(false)
        }
    }

    return (
        <div className = 'forgot-password'>
            <div className = 'form password-form'>
                <p 
                    className = 'password-p'>{toggle ? 
                        "Update Password" : 
                            <Link 
                                className = 'backToLogin' 
                                to = "/">Return to Login
                            </Link>}
                </p>
                <p className = {toggle ? 'hide-password' : 'password-p'}>{newUser ? "Password has been updated" : "This Link is not valid."}</p>
                <input 
                    className = {toggle ? 'input' : " hide-password"} 
                    type ='password' 
                    placeholder = "New Password" 
                    onChange = {e => setPassword(e.target.value)}
                    />
                <input 
                    className = {toggle ? 'input' : " hide-password"} 
                    type ='password' 
                    placeholder = "Confirm Password" 
                    onChange = {e => setPassCheck(e.target.value)}
                    />
                <button 
                    className = {toggle ? 'auth-btn password-btn' : "hide-password"} 
                    onClick = {resetPassword}>
                        Update
                </button>
            </div>
            <div className = 'space'>
                <img 
                    className = 'authLogo' 
                    alt='logo' src='https://cdn.discordapp.com/attachments/789196106965319750/794260091326824499/writersblocklogo.png'/>
                <Link 
                    className = 'backToLogin' 
                    to = '/'>
                    Back to Login
                </Link>
            </div>
        </div>
    )
}

export default Reset