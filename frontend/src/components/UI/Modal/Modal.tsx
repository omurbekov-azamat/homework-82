import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useAppDispatch, useAppSelector} from "../../../app/hook";
import {closeYoutube, selectShowModal, selectYoutubeUrl,} from "../../../features/trackHistrories/trackHistoriesSlice";
import ReactPlayer from "react-player/youtube";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export default function BasicModal() {
    const dispatch = useAppDispatch();
    const openModal = useAppSelector(selectShowModal);
    const url = useAppSelector(selectYoutubeUrl);

    const closeModal = () => {
        dispatch(closeYoutube());
    };

    return (
        <Modal
            open={openModal}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ReactPlayer url={url}/>
            </Box>
        </Modal>
    );
}