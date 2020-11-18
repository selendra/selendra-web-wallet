// Modules
import React, { useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
import { useHistory } from 'react-router-dom';
// Components
import { Input, Select, Button, message } from 'antd';
// Styles
import '../styles/Userverify.css';

function Userverify() {
  const history = useHistory();

  const [first_name, setFirstname] = useState('');
  const [mid_name, setMidname] = useState('');
  const [last_name, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const { Option, OptGroup } = Select;


  const handleVerify = () => {
    setLoading(true);
    AxiosInstance().post('/userprofile', {
      first_name,
      mid_name,
      last_name,
      gender
    })
    .then((res) => {
      message.success(res.data.message);
      setLoading(false);
      history.push('/setting');
    })
  }

  return (
    <div className='userverify'>
      <div className='userverify__container'>
        <p>User Verify</p>
        <Input
          placeholder='First Name'
          onChange={ e => setFirstname(e.target.value) }
          value={first_name}
        ></Input>
        <Input
          placeholder='Middle Name'
          onChange={ e => setMidname(e.target.value) }
          value={mid_name}
        ></Input>
        <Input
          placeholder='Last Name'
          onChange={ e => setLastname(e.target.value) }
          value={last_name}
        ></Input>
        <Select placeholder='Gender' onChange={setGender}>
          <OptGroup label="Gender">
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>s
          </OptGroup>
        </Select>
        <div className='userverify__btnVerify'>
          <Button onClick={handleVerify} loading={loading}>Verify</Button>
        </div>
      </div>
    </div>
  )
}

export default Userverify;