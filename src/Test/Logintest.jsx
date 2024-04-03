import React from 'react'

export default function Logintest() {
    // الطريقة الاولى 
  // const [userName, setuserName] = useState('');
  // const [userPaswword, setuserPaswword] = useState('');
  
  const [user,setUser] = useState({
    name:'',
    password:'',
  });
  // const handelNameChange = (e) => {
  //   setUser({
  //     ...user,
  //   name:e.target.value,
  //   });
  //   console.log("username")
    
  // }
  // const handelPasswordChange = (e) => {
  // setUser({
  //   ...user,
  //   password:e.target.value,
  // });}
  
  const handelChange = (e) => {
    const{name,value} = e.target;
    console.log(name);
    console.log(value);
    setUser({
      ...user,
      [name]:value
    })
  }
  
    
     
    return (
      <>
      {/* <form>
      <label>User Name</label>
        <input type="Name" onChange={(e)=>setuserName(e.target.value)} />
        <label>Paswword</label>
        <input type="password" onChange={(e)=>setuserPaswword(e.target.value)} />
        <input type="submit" />
        <p>username is {userName} and Password is {userPaswword}</p>
      </form>
              */}
          {/* طريقة تانية */}
        {/* <form>
      <label>User Name</label>
        <input type="Name" value={user.name} onChange={handelNameChange }/>
        <label>Paswword</label>
        <input type="password" value={user.password} onChange={handelPasswordChange} />
        <input type="submit" />
        <p>username is {user.name} and Password is {user.password}</p>
      </form> */}
      
              {/* طريقة تالتة */}
  
      <form>
      <label>User Name</label>
        <input type="Name" value={user.name} name='name' onChange={handelChange }/>
        <label>Paswword</label>
        <input type="password" value={user.password} name='password' onChange={handelChange} />
        <input type="submit" />
        <p>username is {user.name} and Password is {user.password}</p>
      </form>
  
  
  <RouterProvider router={router} />
        </>
    )
  }
