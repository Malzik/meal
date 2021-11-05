import React, { useState } from "react";
import { ingredientApi } from "../../../../service/ingredient";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Ingredient = ({title, buttonText, ingredient, updateName}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState(ingredient !== undefined ? ingredient.name : "")

    const createIngredient = () => {
        if (ingredient.id !== undefined) {
            ingredientApi
                .updateIngredient(ingredient.id, name)
                .then(result => {
                    updateName(result)
                    handleClose()
                })
                .catch(err => console.log(err))
        } else {
            ingredientApi
                .addIngredient(name)
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {/*<Modal*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    aria-labelledby="modal-modal-title"*/}
            {/*    aria-describedby="modal-modal-description"*/}
            {/*>*/}
            {/*    <Box sx={style}>*/}
            {/*        <TextField*/}
            {/*            id="outlined-error"*/}
            {/*            label="Nom"*/}
            {/*            value={name}*/}
            {/*            onChange={e => setName(e.target.value)}*/}
            {/*        />*/}
            {/*        <Button variant="contained" color="success" onClick={() => createIngredient()}>*/}
            {/*            <Icon>add_circle</Icon>&nbsp;{buttonText}*/}
            {/*        </Button>*/}
            {/*    </Box>*/}
            {/*</Modal>*/}
            {/*<Button variant="contained" onClick={handleOpen}>{title}</Button>*/}
        </>
    )
}
