import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import User from '../../components/User/User'

const Profile = () => {

    const [userData, setUserData] = useState ([]);
    const params = useParams();

    // Gets User Data and displays it
    useEffect( () => {
        const getData = async (id) => {
            const dataFromServer = await fetchData(id);
            setUserData(dataFromServer)
        }
        getData(params.userName)
    }, [])

    // Fetches Data from Server
    const fetchData = async (id) => {
        const res = await fetch(`/api/profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
    
        const data = await res.json()
        return data;
    
    }

    if({userData}) {
        return (
            <div>
      
                <User user = {userData} />

            </div>
        )
    } else {
        return <div> Loading..... </div>
    }
}

export default Profile
