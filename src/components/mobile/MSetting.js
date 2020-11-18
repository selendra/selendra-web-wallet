import { Select, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import AxiosInstance from '../../helpers/AxiosInstance';
import '../../styles/mobile/MSetting.css';
import { useHistory } from 'react-router-dom';

function MSetting(props) {
  const history = useHistory();
  const { Option, OptGroup } = Select;
  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 1);
      return (`${first}`);
    }
  }

  const [readable, setReadable] = useState(true);
  const [first_name, setFirstname] = useState('');
  const [mid_name, setMidname] = useState('');
  const [last_name, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    AxiosInstance().post('/userprofile', {
      first_name,
      mid_name,
      last_name,
      gender
    })
    .then((res)=> {
      message.success(res.data.message);
      setLoading(false);
      window.location.reload(true);
    })
  }

  return (
    <div className='msetting'>
      <div className='msetting__container'>
        <p>Profile</p>
        <div className='msetting__profile'>
          <div className='msetting__profilePic'>
            <div className='msetting__circle'>
              { props.first_name && props.last_name && (
                <span>{sliceStr(props.first_name) + sliceStr(props.last_name)}</span>
              )}
            </div>
          </div>
          <span onClick={() => setReadable(false)}>Edit Profile</span>
        </div>
        <div className='msetting__field'>
          <div className='msetting__item msetting__username'>
            <div>
              <p>First Name</p>
              { readable ? (
                <Input
                  placeholder='first name'
                  value={props.first_name}
                ></Input>
              ) : (
                <Input
                  placeholder='first name'
                  value={first_name}
                  onChange={ e => setFirstname(e.target.value) }
                ></Input>
              )}
            </div>
            <div style={{padding: "0 10px"}}></div>
            <div>
              <p>Last Name</p>
              { readable ? (
                <Input
                  placeholder='last name'
                  value={props.last_name}
                ></Input>
              ) : (
                <Input
                  placeholder='last name'
                  value={last_name}
                  onChange={ e => setLastname(e.target.value) }
                ></Input>
              )}
            </div>
          </div>
          <div className='msetting__item msetting__select'>
            <span>Gender</span>
            <Select placeholder={props.gender} disabled={readable} onChange={setGender}>
              <OptGroup label="Gender">
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>s
              </OptGroup>
            </Select>
          </div>
          <div className='msetting__item'>
            <p>Email:</p>
            <Input
              readOnly
              value={props.email ? props.email : 'None'}
            ></Input>
          </div>
          <div className='msetting__item'>
            <p>Wallet:</p>
            <Input
              readOnly
              value={props.wallet}
            ></Input>
          </div>
          {!readable && (
            <div className='msetting__btnSave' style={{marginTop: '20px'}}>
              <Button block loading={loading} onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>
      </div>
      <div className='msetting__setting'>
        <div className='msetting__settingContainer'>
          <p>Setting</p>
          <div className='msetting__btn'>
            <div>
              <Button>Change Password</Button>
            </div>
            <div>
              <Button>Change PIN</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MSetting;
