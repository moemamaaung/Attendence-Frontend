import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTeacherById, updateTeachers } from './teacherSlice'
import classes from './TeacherForm.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const EditTeacherForm = () => {

    const { teacherId } = useParams( )
    console.log("TeacherId : "+teacherId)
    const teachers = useSelector((state)=>selectTeacherById(state,Number(teacherId))) 
    console.log(teachers)

    const [ id ] = useState(teachers.id)
    const [ fullname,setFullname] = useState(teachers.fullname)
    const [ phno,setPhno] = useState(teachers.phno)
    const [ username,setUsername] = useState(teachers.username)
    // const [ qualification,setQualification] = useState(teachers.qualification)
    const [ position,setPosition ] = useState(teachers.position)
    const [ nrc,setNrc ] = useState(teachers.nrc)
   // const [ dob,setDob ] = useState(teachers.dob)
    const [gender,setGender] = useState(teachers.gender)
  
    const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')
  
    const onFullnameChange = e => setFullname(e.target.value)
    const onPhnoChange = e => setPhno(e.target.value)
    const onUsernameChange = e => setUsername(e.target.value)
    // const onQualificationChange = e => setQualification(e.target.value)
    const onPositionChange = e => setPosition(e.target.value)
    const onNrcChange = e => setNrc(e.target.value)
    // const onDobChange = e => setDob(e.target.value)
    const onGenderChange = e => setGender(e.target.value)
    
    const canSave = [id,fullname,phno,username,position,nrc,gender].every(Boolean) && updateRequestStatus === 'idle'
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const onSubmit = (event) => {
      event.preventDefault();
  
      if(canSave){
        try{
          setUpdateRequestStatus('pending')
  
          dispatch(
            updateTeachers({
              id,
              fullname,
              phno,
              username,
              // qualification,
              position,
              nrc,
             // dob,
              gender
    
            })
            )
        }catch(error){
          console.log(error)
        }finally{
          setUpdateRequestStatus('idle')
        }
  
        setFullname('')
        setPhno('')
        setUsername('')
        // setQualification('')
        setPosition('')
        setNrc('')
        // setDob('')
        setGender('')
  
        navigate('/allteachers')
      }
    }
  
  return (
    <div class="main-panel">
    <div class="content-wrapper">
      <div className={classes.formboldformwrapper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <p className={classes.title}>Update Teacher</p>
          <label>
              <input type="text" className={classes.input} value={id}  />
              <span>Id</span>
            </label>
          <div className={classes.flex}>
            <label>
              <input type="text" className={classes.input} value={fullname} onChange={onFullnameChange} />
              <span>Fullname</span>
            </label>
            <label>
              <input type="text" className={classes.input} value={phno} onChange={onPhnoChange}/>
              <span>Phno</span>
            </label>
          </div>

          <label>
            <input type="email" className={classes.input} value={username} onChange={onUsernameChange}/>
            <span>Email</span>
          </label>

          {/* <label>
            <input type="text" className={classes.input} value={qualification} onChange={onQualificationChange}/>
            <span>Qualification</span>
          </label> */}

          <label>
            <input type="text" className={classes.input} value={position} onChange={onPositionChange}/>
            <span>Position</span>
          </label>

          <label>
            <input type="text" className={classes.input} value={nrc} onChange={onNrcChange}/>
            <span>NRC</span>
          </label>

          {/* <label>
            <input type="date" className={classes.input} value={dob} onChange={onDobChange}/>
            <span>Date Of Birth</span>
          </label> */}

          <div>
          <select
            className="form-select"
            value={gender}
            onChange={onGenderChange}
          >
            <option>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <center>
            <button className={classes.send}>
            <i class="mdi mdi-file-check btn-icon-prepend"></i> UPDATE
             
            </button>
            </center>
        </form>
      </div>
    </div>
  </div>
  )
}

export default EditTeacherForm