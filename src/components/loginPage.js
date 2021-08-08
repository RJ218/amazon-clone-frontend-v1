import React, { useState } from 'react'
import './loginPage.css'
import validator from 'validator'
import { Link } from 'react-router-dom';
import history from '../history';

function LoginPage({ setCurrentUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailStatus, setEmailStatus] = useState('')

    const signIn = e => {
        e.preventDefault();

        if (emailStatus == 'Enter valid Email!') {
            alert(emailStatus)
            return
        }
        let credentials = {
            "Email": email,
            "Password": password
        }

        fetch('https://amazon-clone-v-1-0.herokuapp.com/signIn', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json()).then(data => {
            console.log(data)
            setCurrentUser({ id: data._id, Email: data.Email })
            localStorage.setItem("user", JSON.stringify(data));
            history.push('/products')
        }).catch(err => {
            console.log('error - ' + err)
            alert('Entered Email Id or Password is Not Correct.')
        })

    }

    const register = e => {
        try {
            console.log('abcd')
            e.preventDefault();

            if (emailStatus == 'Enter valid Email!' || emailStatus == '') {
                console.log('Enter valid Email!')
                alert('Enter a valid Email')
                return
            }

            let credentials = {
                "Email": email,
                "Password": password
            }
            console.log(credentials)
            fetch('https://amazon-clone-v-1-0.herokuapp.com/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }).then(response => response.json()).then(data => {
                console.log(data)
                setCurrentUser({ id: data._id, Email: data.Email })
                alert('Sign Up Successfull. Click the Sign In Button To Sign In.')

            }).catch(err => {
                console.log(err)
                alert('Already Used Email Id')
            })

        } catch (err) {
            console.log(err);
        }
    }

    const validateEmail = (e) => {
        var email = e.target.value
        setEmail(email)
        if (validator.isEmail(email)) {
            setEmailStatus('Valid Email.')
        } else {
            setEmailStatus('Enter valid Email!')
        }
    }
    return (
        <div className='loginPage'>

            <div className='loginContainer'>
                <h1>Sign-in</h1>

                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={validateEmail}></input>
                    <span style={{ fontWeight: 'bold', color: 'red', }}>{emailStatus}</span>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    <button type='submit' onClick={signIn} className='loginSignInButton'>Sign In</button>
                </form>

                <button onClick={register} className='loginSignUpButton'>Sign Up</button>
            </div>

        </div>
    )
}

export default LoginPage;
