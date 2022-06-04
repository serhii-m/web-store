import React, {useState} from 'react'
import {Button, Container} from "react-bootstrap"

const AdminPage: React.FC = () => {
   /* const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)*/

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
               /* onClick={() => setTypeVisible(true)}*/
            >
                Add TagType
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                /*onClick={() => setBrandVisible(true)}*/
            >
                Add type
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
              /*  onClick={() => setDeviceVisible(true)}*/
            >
                Add product
            </Button>
        </Container>
    );
};

export default AdminPage