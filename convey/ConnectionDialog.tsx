import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

export default function(props : IProps) {
    const [modal, setModal] = useState(true);

    function toggle() {
        setModal(!modal);
        props.onClose();
    }

    return (
        <div className={"lto-modal-container"}>
            <Modal isOpen={modal} toggle={toggle} /*className={className}*/>
                <ModalHeader toggle={toggle}>Verbindung</ModalHeader>
                <ModalBody>
                    Schlechte Internetverbindung
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Seite Neu Laden</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
};

interface IProps {
    label : string
    message : string
    onClose : () => void
}
