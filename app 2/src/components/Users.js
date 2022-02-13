import React, {useState, useEffect} from 'react';
import userService from '../services/user';
import User from './User';

function Users(props) {

    const [users, setUsers] = useState(null);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        userService.getAll(keyword)
        .then(result => {
            setUsers(result.data)
        });
    }, [keyword]);

    const renderUsers = () => {
        if(!users) return;
        return users.map(u => <User data={u} />);
    }

    return (
        <div className="container">
            <div className="row mt-20">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Search..."
                        value={keyword} onChange={e=>setKeyword(e.target.value)} />
                </div>
            </div>
            <div className="row mt-20">
                <div className="col">
                    <ul>
                        {renderUsers()}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Users;