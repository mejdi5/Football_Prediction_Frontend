import React, {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Axios } from "../Axios"



const EditFixtureModal = ({showEditFixtureModal, setShowEditFixtureModal, currentFixture}) => {

    const user = useSelector(state => state.userSlice.user)
    const [deadline, setDeadline] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const handleEditFixtureDeadline = (e) => {
        if (deadline) {
            try {
                Axios.put(`/fixtures/${currentFixture?._id}`, {
                    fixtureNumber: currentFixture?.fixtureNumber,
                    deadline, 
                })
            } catch (err) {
            console.log(err)
            }
        }
        setShowEditFixtureModal(false)
    }

    useEffect(() => {
        date && time &&
    setDeadline(date + 'T' + time)
    }, [date, time])


return (
    <Modal isOpen={showEditFixtureModal} toggle={() => setShowEditFixtureModal(!showEditFixtureModal)}>
    <ModalHeader toggle={() => setShowEditFixtureModal(!showEditFixtureModal)}>Edit Fixture</ModalHeader>
    <ModalBody>
    <Form>
    <FormGroup>
        <Label style={{marginRight: '5px'}}>Fixture:</Label>
        <span>{currentFixture?.fixtureNumber}</span>
    </FormGroup>
    <FormGroup>
        <Label>New DeadLine</Label>
        <input 
        type="date" 
        required 
        className="form-control"
        onChange={e => setDate(e.target.value)}
        />
        <input 
        type="time" 
        className="form-control"
        onChange={e => setTime(e.target.value)}
        />
    </FormGroup>
    <Button 
    onClick={e => user.isAdmin && handleEditFixtureDeadline(e)}
    color="primary"
    >Save</Button>
    </Form>
    </ModalBody>
</Modal>
)}

export default EditFixtureModal